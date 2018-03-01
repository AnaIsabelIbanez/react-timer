import { createSelector } from 'reselect';

const makeSelectorTimerTask = (state) => {
    return state.timerTask;
};

const makeSelectTimer = (attribute) => createSelector(
    makeSelectorTimerTask,
    (timerState) => timerState.timer[attribute]
);

const makeSelectTask = (attribute) => createSelector(
    makeSelectorTimerTask,
    (timerState) => timerState.tasks[attribute]
);

const getTasks = () => makeSelectTask('tasks');
const getCurrentTask = () => makeSelectTimer('currentTask');
const getVisibleDay = () => makeSelectTask('visibleDay');
const getShowSpinner = () => makeSelectTask('showSpinner');
const getTaskToAdd = () => makeSelectTask('taskToAdd');

export {
    getCurrentTask,
    getTasks,
    getVisibleDay,
    getShowSpinner,
    getTaskToAdd
};
