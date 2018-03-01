import {
    TOGGLE_EXECUTIONS,
    TOGGLE_ALL_EXECUTIONS,
    CHANGE_VISIBLE_DAY,
    SET_TASKS,
    CHANGE_TASK_NAME,
    TOGGLE_SPINNER,
    SET_TASK_TO_ADD,
    REMOVE_TASK,
    REMOVE_NO_PERSIST,
    ADD_TASK
} from '../constants';

import {getCalendarDay, addDays, getMomentByIsoString} from '../../../utils/utilities';
import moment from 'moment/moment';
import {findStorageItems, getFromLocalStorage} from '../../../utils/utilities';

const parsedTaskFromBackendOrStorage = (task) => {
    task.initialTime = getMomentByIsoString(task.initialTime);
    task.finalTime = getMomentByIsoString(task.finalTime);
    if (task.executions) {
        task.executions = task.executions.map((execution) => {
            execution.initialTime = getMomentByIsoString(execution.initialTime);
            execution.finalTime = getMomentByIsoString(execution.finalTime);
            return execution;
        });
    }
    return task;
};

const getParsedAllTasks = (tasks) => {
    return tasks.map((task) => {
        return parsedTaskFromBackendOrStorage(task);
    });
};

const getTasksFromStorage = () => {
    const storagedTasks = getFromLocalStorage('tasks');
    return storagedTasks ? getParsedAllTasks(storagedTasks) : [];
};


const initialState = {
    tasks: getTasksFromStorage(),
    showAll: false,
    visibleDay: moment(),
    showSpinner: false,
    taskToAdd: null
};

const areTheSameTasks = (taskA, taskB) => {
    return taskA.name === taskB.name && getCalendarDay(taskA.initialTime) === getCalendarDay(taskB.initialTime);
};

const changeAllExecutions = (tasks = [], attribute, value) => {
    return tasks.map((task) => {
        task[attribute] = value;
        return task;
    });
};

const toggleExecution = (tasks, taskToUpdate) => {
    const copiedTasks = [...tasks];
    const foundTask = copiedTasks.find((task) => (areTheSameTasks(task, taskToUpdate)));
    foundTask.showExecutions = !foundTask.showExecutions;
    return copiedTasks;
};

const updateTaskName = (tasks, taskToUpdate, value) => {
    const copiedTasks = [...tasks];
    const task = copiedTasks.find((task) => (areTheSameTasks(task, taskToUpdate)));
    task.name = value;
    task.executions = changeAllExecutions(task.executions, 'name', value);
    return copiedTasks;
};

const getTasks = (state, newtasks) => {
    const parsedNewTasks = getParsedAllTasks(newtasks);
    const noPersistedTasks = state.tasks.filter((task) => {
        return task.noPersisted === true;
    });
    return parsedNewTasks.concat(noPersistedTasks);
};

const createNewTask = (newExecution) => {
    return {
        ...newExecution,
        executions: [{
            ...newExecution
        }]
    };
};

const addTask = (state, executionToAdd) => {
    const copiedTasks = [...state.tasks];
    const taskIndex = copiedTasks.findIndex((task) => (areTheSameTasks(task, executionToAdd)));
    if (taskIndex > -1) {
        const taskUpdate = copiedTasks[taskIndex];
        taskUpdate.finalTime = executionToAdd.finalTime;
        taskUpdate.noPersisted = executionToAdd.noPersisted;
        if (state.taskToAdd.retried !== true) {
            taskUpdate.seconds += executionToAdd.seconds;
            taskUpdate.executions.push(executionToAdd);
        }
        taskUpdate.showExecutions = false;
    } else {
        copiedTasks.push(createNewTask({...executionToAdd}));
    }
    return copiedTasks;
};

const getTasksRemovePersist = (tasks, taskToUpdate) => {
    const copiedTasks = [...tasks];
    const taskIndex = copiedTasks.findIndex((task) => (areTheSameTasks(task, taskToUpdate)));
    if (taskIndex > -1) {
        const taskUpdate = copiedTasks[taskIndex];
        delete taskUpdate.noPersisted;
    }
    return copiedTasks;
};

function TasksReducer(state = initialState, {type, payload, meta}) {

    switch (type) {
        case TOGGLE_ALL_EXECUTIONS:
            const newShowAll = !state.showAll;
            getTasksFromStorage();
            return {
                ...state,
                showAll: newShowAll,
                tasks: changeAllExecutions(state.tasks, 'showExecutions', newShowAll)
            };
        case TOGGLE_EXECUTIONS:
            return {
                ...state,
                tasks: toggleExecution(state.tasks, payload)
            };
        case CHANGE_VISIBLE_DAY:
            return {
                ...state,
                visibleDay: addDays(state.visibleDay, payload)
            };
        case SET_TASKS:
            return {
                ...state,
                tasks: getTasks(state, payload)
            };
        case CHANGE_TASK_NAME:
            return {
                ...state,
                tasks: updateTaskName(state.tasks, payload.task, payload.value)
            };
        case TOGGLE_SPINNER:
            return {
                ...state,
                showSpinner: !state.showSpinner
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: addTask(state, payload, meta)
            };
        case SET_TASK_TO_ADD:
            return {
                ...state,
                taskToAdd: {
                    task: payload,
                    retried: meta
                }
            };
        case REMOVE_TASK:
            return {
                ...state,
                taskToAdd: null
            };
        case REMOVE_NO_PERSIST:
            return {
                ...state,
                tasks: getTasksRemovePersist(state.tasks, payload)
            };
        default:
            return state;
    }
}

export default TasksReducer;
