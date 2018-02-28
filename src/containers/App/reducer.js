import {
    SET_USER,
    HIDE_MODAL
} from './constants';

const initialState = {
    user: null,
    modal: {
        open: false,
        type: '',
        title: 'error_title_key',
        message: 'error_message_key',
        details: []
    }
};

function appReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: payload
            };
        case 'SHOW_MODAL':
            return {
                ...state,
                modal: {
                    ...payload,
                    open: true
                }
            };
        case HIDE_MODAL:
            const initialStateCopy = {...initialState};
            return {
                ...state,
                modal: initialStateCopy.modal
            };
        default:
            return state;
    }
}

export default appReducer;
