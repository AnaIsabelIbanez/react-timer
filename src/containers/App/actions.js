import {SET_USER} from './constants';

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const showModal = (options) => {
    return {
        type: 'SHOW_MODAL',
        payload: options
    };
};

export const hideModal = () => {
    return {
        type: 'HIDE_MODAL'
    };
};
