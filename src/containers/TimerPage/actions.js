import {ADD_TASK, INCREMENT_TIME, STOP_TIME, RESET, INIT_TIME, SET_TASK, CHANGE_TASK_NAME, TOGGLE_EXECUTIONS} from './constants';

export const addTask = (currentTask) => ({
    type: ADD_TASK,
    payload: currentTask
});

export const initTime = () => ({
    type: INIT_TIME
});

export const incrementTime = () => ({
    type: INCREMENT_TIME
});

export const stopTime = () => ({
    type: STOP_TIME
});

export const reset = () => ({
    type: RESET
});

export const setCurrentTask = (task) => ({
    type: SET_TASK,
    payload: task
});

export const changeTaskName = (taskName) => ({
    type: CHANGE_TASK_NAME,
    payload: taskName
});

export const toggleExecutions = (task) => ({
    type: TOGGLE_EXECUTIONS,
    payload: task
});
