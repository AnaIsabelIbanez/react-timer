import {
    TOGGLE_EXECUTIONS,
    TOGGLE_ALL_EXECUTIONS,
    CHANGE_VISIBLE_DAY,
    SET_TASKS,
    CHANGE_TASK_NAME,
    TOGGLE_SPINNER,
    SET_EXECUTION_TO_ADD,
    RETRY_EXECUTIONS_TASK,
    REMOVE_EXECUTION,
    REMOVE_NO_PERSIST,
    ADD_TASK,
    TASK_STORAGE_KEY,
    SET_TASK_TO_CHANGE_NAME,
    CHANGE_NO_PERSISTED
} from '../constants';

import {getCalendarDay, addDays, getMomentByIsoString} from '../../../utils/utilities';
import moment from 'moment/moment';
import {findStorageItems} from '../../../utils/utilities';

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

const getParsedTasks = (tasks) => {
    return tasks.map((task) => {
        return parsedTaskFromBackendOrStorage(task);
    });
};

const areTheSameTasks = (taskA, taskB) => {
    return taskA.name === taskB.name && getCalendarDay(taskA.initialTime) === getCalendarDay(taskB.initialTime);
};

const createNewTask = (newExecution) => {
    return {
        ...newExecution,
        executions: [{
            ...newExecution
        }]
    };
};

const addTask = (tasks, executionToAdd, retried) => {
    const copiedTasks = [...tasks];
    const taskIndex = copiedTasks.findIndex((task) => (areTheSameTasks(task, executionToAdd)));
    if (taskIndex > -1) {
        const taskUpdate = copiedTasks[taskIndex];
        taskUpdate.finalTime = executionToAdd.finalTime;
        if (retried !== true) {
            taskUpdate.seconds += executionToAdd.seconds;
            taskUpdate.executions.push(executionToAdd);
        } else {
            const {executions} = taskUpdate;
            const executionIndex = executions.findIndex((execution) => execution.initialTime.isSame(executionToAdd.initialTime));
            if (executionIndex > -1) {
                const executionUpdate = executions[executionIndex];
                executionUpdate.noPersisted = executionToAdd.noPersisted;
                executionUpdate.id = executionToAdd.id;
            }
        }
        taskUpdate.showExecutions = executionToAdd.showExecutions;
        const noPersistedTask = taskUpdate.executions.find((execution) => execution.noPersisted === true);
        taskUpdate.noPersisted = noPersistedTask !== undefined;
    } else {
        copiedTasks.push(createNewTask({...executionToAdd}));
    }
    return copiedTasks;
};

const getTasksFromStorage = () => {
    const storageTasksNoParsed = findStorageItems(TASK_STORAGE_KEY).map((task) => task.val);
    const storgeTasks = getParsedTasks(storageTasksNoParsed);
    let tasks = [];
    storgeTasks.forEach((task) => {
        tasks = addTask(tasks, task);
    });
    return tasks;
};


const initialState = {
    tasks: getTasksFromStorage(),
    showAll: false,
    visibleDay: moment(),
    showSpinner: false,
    executionToAdd: null,
    taskToRetry: null,
    taskToChangeName: null
};

const changeAllExecutions = (tasks = [], attribute, value) => {
    return tasks.map((task) => {
        task[attribute] = value;
        return task;
    });
};

const getTaskAddNoPersist = (tasks, taskUpdate) => {
    const copiedTasks = [...tasks];
    const taskIndex = copiedTasks.findIndex((task) => (areTheSameTasks(task, taskUpdate)));
    if (taskIndex > -1) {
        const taskUpdate = copiedTasks[taskIndex];
        taskUpdate.noPersisted = true;
        changeAllExecutions(taskUpdate.executions, 'noPersisted', true);
    }
    return copiedTasks;
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
    const parsedNewTasks = getParsedTasks(newtasks);
    const noPersistedTasks = state.tasks.filter((task) => {
        return task.noPersisted === true;
    });
    return parsedNewTasks.concat(noPersistedTasks);
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

const getTasksAddNoPersistExec = (tasks, exec) => {

}

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
                tasks: addTask(state.tasks, payload, meta)
            };
        case SET_EXECUTION_TO_ADD:
            return {
                ...state,
                executionToAdd: payload
            };
        case REMOVE_EXECUTION:
            return {
                ...state,
                executionToAdd: null
            };
        case REMOVE_NO_PERSIST:
            return {
                ...state,
                tasks: getTasksRemovePersist(state.tasks, payload)
            };
        case RETRY_EXECUTIONS_TASK:
            return {
                ...state,
                taskToRetry: payload
            };
        case SET_TASK_TO_CHANGE_NAME:
            return {
                ...state,
                taskToChangeName: payload
            };
        case CHANGE_NO_PERSISTED:
            return {
                ...state,
                tasks: getTaskAddNoPersist(state.tasks, payload)
            };
        case 'CHANGE_PERSISTED_EXECUTION':
            return {
                ...state,
                tasks: getTasksAddNoPersistExec(state.tasks, payload)
            };
        default:
            return state;
    }
}

export default TasksReducer;
