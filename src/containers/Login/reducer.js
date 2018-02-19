import {
    CHANGE_USERNAME,
    CHANGE_PASSWORD
} from './constants';

const initialState = {
    username: '',
    password: ''
};

function LoginReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_USERNAME:
            return {
                ...state,
                username: payload.trim()
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: payload.trim()
            }
        default:
            return state;
    }
}

export default LoginReducer;
