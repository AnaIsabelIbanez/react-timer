import { call, put, select, takeLatest } from 'redux-saga/effects';

import { setTasks } from '../actions';
import { getVisibleDay } from '../selectors';
import { getTasks } from '../../../api/task';

export default function* changeDaySaga() {
    const day = yield select(getVisibleDay());
    try {
        console.log('visibleDay', day.toISOString());
        const tasks = yield call(getTasks, day);
        yield put(setTasks(tasks));
    } catch (err) {
        console.log('error');
    }
}
