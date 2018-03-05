import {
    CHANGE_VISIBLE_DAY, RETRY_UPDATE, SET_EXECUTION_TO_ADD, RETRY_EXECUTIONS_TASK,
    SET_TASK_TO_CHANGE_NAME
} from '../constants';
import {fork, takeLatest, takeEvery} from 'redux-saga/effects';

import timeSaga from './timeSaga';
import changeDaySaga from './changeDaySaga';
import {addTaskSaga, retryAddSaga, retryExecutionsTaskSaga, changeTaskNameSaga} from  './addTaskSaga';

export default function* timer() {
    yield fork(timeSaga);
    yield takeLatest(CHANGE_VISIBLE_DAY, changeDaySaga);
    yield takeEvery(SET_EXECUTION_TO_ADD, addTaskSaga);
    yield takeLatest(RETRY_UPDATE, retryAddSaga);
    yield takeLatest(RETRY_EXECUTIONS_TASK, retryExecutionsTaskSaga);
    yield takeLatest(SET_TASK_TO_CHANGE_NAME, changeTaskNameSaga);
}
