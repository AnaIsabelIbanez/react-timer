import { createSelector } from 'reselect';

const selectApp = (state) => {
    return state.global;
};

const makeSelect = (attribute) => createSelector(
    selectApp,
    (appState) => appState[attribute]
);

const getModalOptions = () => makeSelect('modal');

const getUser = () => makeSelect('user');

export {
    selectApp,
    getUser,
    getModalOptions
};
