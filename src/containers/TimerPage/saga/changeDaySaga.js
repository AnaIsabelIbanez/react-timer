import { call, put, select, takeLatest } from 'redux-saga/effects';

import { setTasks, toggleSpinner  } from '../actions';
import { getVisibleDay } from '../selectors';
import { getTasks } from '../../../api/task';
import {showError} from '../../App/actions';

export default function* changeDaySaga() {
    const day = yield select(getVisibleDay());
    yield put(toggleSpinner());
    try {
        const tasks = yield call(getTasks, day);
        yield put(setTasks(tasks));
    } catch (error) {
        yield put(showError(error));
    } finally {
        yield put(toggleSpinner());
    }
}
