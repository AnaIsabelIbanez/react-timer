import { createSelector } from 'reselect';

const selectLogin = (state) => state.login;

const makeSelect = (attribute) => createSelector(
    selectLogin,
    (loginState) => loginState[attribute]
);

const getUsername = () => makeSelect('username');
const getPassword = () => makeSelect('password');

export {
    selectLogin,
    getUsername,
    getPassword
};
