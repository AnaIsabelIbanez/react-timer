import { createSelector } from 'reselect';

const makeSelector = (state) => {
    return state.timerPage;
};

const makeSelect = (attribute) => createSelector(
    makeSelector,
    (timerState) => timerState[attribute]
);

const getTasks = () => makeSelect('tasks');

const getCurrentTask = () => makeSelect('currentTask');

export {
    getCurrentTask,
    getTasks
};
