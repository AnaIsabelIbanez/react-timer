import {
    ADD_TASK,
    INCREMENT_TIME,
    STOP_TIME,
    RESET,
    INIT_TIME,
    SET_TASK,
    CHANGE_CURRENT_TASK_NAME,
    TOGGLE_EXECUTIONS,
    TOGGLE_ALL_EXECUTIONS,
    CHANGE_VISIBLE_DAY,
    SET_TASKS,
    CHANGE_TASK_NAME
} from './constants';

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

export const changeCurrentTaskName = (taskName) => ({
    type: CHANGE_CURRENT_TASK_NAME,
    payload: taskName
});

export const toggleExecutions = (task) => ({
    type: TOGGLE_EXECUTIONS,
    payload: task
});

export const toggleAllExecutions = () => ({
    type: TOGGLE_ALL_EXECUTIONS
});

export const changeVisibleDay = (days) => ({
    type: CHANGE_VISIBLE_DAY,
    payload: days
});

export const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
});

export const changeTaskName = (task, value) => ({
    type: CHANGE_TASK_NAME,
    payload: {task, value}
});
