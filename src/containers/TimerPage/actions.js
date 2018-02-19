import { ADD_TASK, INCREMENT_TIME, STOP_TIME, RESET, INIT_TIME } from './constants';
import {SET_TASK} from '../CurrentTask/constants';

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
