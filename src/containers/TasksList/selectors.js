import { createSelector } from 'reselect';

const selectTaskList = (state) => {
    return state.taskList;
}

const makeSelect = (attribute) => createSelector(
    selectTaskList,
    (timerState) => timerState[attribute]
);

const getTasks = () => makeSelect('tasks');

export {
    selectTaskList,
    getTasks
};
