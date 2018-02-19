import {
    CHANGE_TASK_NAME,
    SET_TASK
} from './constants';

import {
    INCREMENT_TIME,
    INIT_TIME,
    STOP_TIME,
    RESET
} from '../TimerPage/constants';

const initialState = {
    name: '',
    seconds: 0,
    status: 'Stopped',
    initialTime: null,
    finalTime: null
};

function TimerReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_TASK_NAME:
            return {
                ...state,
                name: payload
            };
        case INCREMENT_TIME:
            return {
                ...state,
                seconds: state.seconds + 1
            };
        case RESET:
            return { ...initialState };
        case INIT_TIME:
            return {
                ...state,
                status: 'Running',
                initialTime: Date.now()
            };
        case STOP_TIME:
            return {
                ...state,
                status: 'Stopped',
                finalTime: Date.now()
            };
        case SET_TASK:
            return {
                ...state,
                name: payload.name,
                seconds: 0
            }
        default:
            return state;
    }
}

export default TimerReducer;
