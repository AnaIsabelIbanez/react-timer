import {
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
    CHANGE_TASK_NAME,
    TOGGLE_SPINNER,
    REMOVE_NO_PERSIST,
    RETRY_EXECUTIONS_TASK,
    SET_EXECUTION_TO_ADD,
    REMOVE_EXECUTION,
    ADD_TASK,
    RETRY_UPDATE,
    SET_TASK_TO_CHANGE_NAME,
    CHANGE_NO_PERSISTED
} from './constants';

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

export const toggleSpinner = () => ({
    type: TOGGLE_SPINNER
});

export const addTask = (task, retried) => ({
    type: ADD_TASK,
    payload: task,
    meta: retried
});

export const setExecutionToAdd = (execution, retried) => {
    return {
        type: SET_EXECUTION_TO_ADD,
        payload: execution
    };
};

export const removeExecutionToAdd = () => ({
    type: REMOVE_EXECUTION
});

export const removeNoPersist = (task) => ({
    type: REMOVE_NO_PERSIST,
    payload: task
});

export const retryUpdateTasks = () => ({
    type: RETRY_UPDATE
});

export const retryExecutionsTask = (task) => ({
    type: RETRY_EXECUTIONS_TASK,
    payload: task
});

export const setTaskToChangeName = (task) => ({
    type: SET_TASK_TO_CHANGE_NAME,
    payload: task
});

export const changeNoPersisted = (task) => ({
    type: CHANGE_NO_PERSISTED,
    payload: task
});
