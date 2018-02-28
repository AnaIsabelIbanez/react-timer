import { createSelector } from 'reselect';

const makeSelector = (state) => {
    return state.timer;
};

const makeSelect = (attribute) => createSelector(
    makeSelector,
    (timerState) => timerState[attribute]
);

const getTasks = () => makeSelect('tasks');

const getCurrentTask = () => makeSelect('currentTask');
const getVisibleDay = () => makeSelect('visibleDay');
const getShowSpinner = () => makeSelect('showSpinner');
const getTaskToAdd = () => makeSelect('taskToAdd');

export {
    getCurrentTask,
    getTasks,
    getVisibleDay,
    getShowSpinner,
    getTaskToAdd
};
