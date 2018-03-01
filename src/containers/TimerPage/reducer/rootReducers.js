import { combineReducers } from 'redux';

import tasks from './tasks';
import timer from './timer';

export default combineReducers({
    tasks,
    timer
});
