import {
    CHANGE_CURRENT_TASK_NAME,
    SET_TASK,
    INCREMENT_TIME,
    INIT_TIME,
    STOP_TIME,
    RESET,
    STATUS_RUNNING,
    STATUS_STOPPED
} from '../constants';
import moment from 'moment/moment';

const initialState = {
    currentTask: {
        name: '',
        seconds: 0,
        status: STATUS_STOPPED,
        initialTime: null,
        finalTime: null
    }
};

const setCurrentTask = (state, newAttributeCurrentTask) => {
    return {
        ...state,
        currentTask: {
            ...state.currentTask,
            ...newAttributeCurrentTask
        }
    };
};

function TimerReducer(state = initialState, {type, payload}) {

    switch (type) {
        case CHANGE_CURRENT_TASK_NAME:
            return setCurrentTask(state, {name: payload});
        case INCREMENT_TIME:
            return setCurrentTask(state, {seconds: state.currentTask.seconds + 1});
        case RESET:
            return setCurrentTask(state, initialState.currentTask);
        case INIT_TIME:
            return setCurrentTask(state, {status: STATUS_RUNNING, initialTime: moment()});
        case STOP_TIME:
            return setCurrentTask(state, {status: STATUS_STOPPED, finalTime: moment()});
        case SET_TASK:
            return setCurrentTask(state, {name: payload.name, seconds: 0});
        default:
            return state;
    }
}

export default TimerReducer;
