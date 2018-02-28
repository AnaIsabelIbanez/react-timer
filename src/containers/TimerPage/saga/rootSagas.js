import {CHANGE_VISIBLE_DAY, SET_TASK_TO_ADD} from '../constants';
import { fork, takeLatest, take } from 'redux-saga/effects';

import timeSaga from './timeSaga';
import changeDaySaga from './changeDaySaga';
import addTaskSaga from  './addTaskSaga';

export default function* timer() {
    yield fork(timeSaga);
    // yield fork(addTaskSaga);
    yield takeLatest(CHANGE_VISIBLE_DAY, changeDaySaga);
    yield takeLatest(SET_TASK_TO_ADD, addTaskSaga);
}
