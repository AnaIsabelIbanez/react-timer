import {
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    DO_LOGIN
} from './constants';

export const changeUsername = (name) => ({
    type: CHANGE_USERNAME,
    payload: name,
});

export const changePassword = (password) => ({
    type: CHANGE_PASSWORD,
    payload: password,
});

export const doLogin = ({username, password}) => ({
    type: DO_LOGIN
});
