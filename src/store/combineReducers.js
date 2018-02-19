import { combineReducers } from 'redux';
import login from '../containers/Login/reducer';
import timerPage from '../containers/TimerPage/reducer';
import app from '../containers/App/reducer';

const rootReducer = combineReducers({
    login,
    timerPage,
    app
});

export default rootReducer;
