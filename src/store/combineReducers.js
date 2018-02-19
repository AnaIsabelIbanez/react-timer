import { combineReducers } from 'redux';
import login from '../containers/Login/reducer';
import currentTask from '../containers/CurrentTask/reducer';
import taskList from '../containers/TasksList/reducer';
import app from '../containers/App/reducer';

const rootReducer = combineReducers({
    login,
    currentTask,
    app,
    taskList
});

export default rootReducer;
