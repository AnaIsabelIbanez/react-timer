import { createSelector } from 'reselect';

const makeSelector = (state) => {
    return state.currentTask;
};

const getCurrentTask = (attribute) => createSelector(
    makeSelector,
    (timerState) => timerState
);

export {
    getCurrentTask
};
