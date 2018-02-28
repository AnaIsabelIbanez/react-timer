import {
    CHANGE_CURRENT_TASK_NAME,
    SET_TASK,
    INCREMENT_TIME,
    INIT_TIME,
    STOP_TIME,
    RESET,
    TOGGLE_EXECUTIONS,
    STATUS_RUNNING,
    STATUS_STOPPED,
    TOGGLE_ALL_EXECUTIONS,
    CHANGE_VISIBLE_DAY,
    SET_TASKS,
    CHANGE_TASK_NAME,
    TOGGLE_SPINNER,
    ADD_NO_PERSIST_TASK,
    SET_TASK_TO_ADD,
    REMOVE_TASK,
    REMOVE_NO_PERSIST
} from './constants';

import {getDayByTimesptamp, addDays, getTimeStampByIsoString} from '../../utils/utilities';
import moment from 'moment/moment';

const initialState = {
    currentTask: {
        name: '',
        seconds: 0,
        status: STATUS_STOPPED,
        initialTime: null,
        finalTime: null
    },
    tasks: [],
    showAll: false,
    visibleDay: moment(),
    showSpinner: false,
    taskToAdd: null
};

const setCurrentTask = (state, newAttributeCurrentTask) => {
    return {
        ...state,
        currentTask: {
            ...state.currentTask,
            ...newAttributeCurrentTask
        }
    };
};

const areTheSameTasks = (taskA, taskB) => {
    return taskA.name === taskB.name && getDayByTimesptamp(taskA.initialTime) === getDayByTimesptamp(taskB.initialTime);
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

const updateTaskName = (tasks, taskToUpdate, attribute, value) => {
    const copiedTasks = [...tasks];
    const task = copiedTasks.find((task) => (areTheSameTasks(task, taskToUpdate)));
    task[attribute] = value;
    task.executions = changeAllExecutions(task.executions, 'name', value);
    return copiedTasks;
};

const getTasks = (state, newtasks) => {
    const parsedNewTasks = newtasks.map((task) => {
        task.initialTime = getTimeStampByIsoString(task.initialTime);
        task.finalTime = getTimeStampByIsoString(task.finalTime);
        task.executions = task.executions.map((execution) => {
            execution.initialTime = getTimeStampByIsoString(execution.initialTime);
            execution.finalTime = getTimeStampByIsoString(execution.finalTime);
            return execution;
        });
        return task;
    });
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
        taskUpdate.seconds += executionToAdd.seconds;
        if (state.taskToAdd.retried !== true) {
            taskUpdate.executions.push(executionToAdd);
        }
        taskUpdate.showExecutions = false;
        taskUpdate.noPersisted = true;
    } else {
        copiedTasks.push(createNewTask({...executionToAdd, noPersisted: true}));
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

function TimerReducer(state = initialState, {type, payload, meta}) {

    switch (type) {
        case CHANGE_CURRENT_TASK_NAME:
            return setCurrentTask(state, {name: payload});
        case INCREMENT_TIME:
            return setCurrentTask(state, {seconds: state.currentTask.seconds + 1});
        case RESET:
            return setCurrentTask(state, initialState.currentTask);
        case INIT_TIME:
            return setCurrentTask(state, {status: STATUS_RUNNING, initialTime: Date.now()});
        case STOP_TIME:
            return setCurrentTask(state, {status: STATUS_STOPPED, finalTime: Date.now()});
        case SET_TASK:
            return setCurrentTask(state, {name: payload.name, seconds: 0});
        case TOGGLE_ALL_EXECUTIONS:
            const newShowAll = !state.showAll;
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
                tasks: updateTaskName(state.tasks, payload.task, 'name', payload.value)
            };
        case TOGGLE_SPINNER:
            return {
                ...state,
                showSpinner: !state.showSpinner
            };
        case ADD_NO_PERSIST_TASK:
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

export default TimerReducer;
