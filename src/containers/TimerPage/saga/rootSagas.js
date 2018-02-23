import {CHANGE_VISIBLE_DAY} from '../constants';
import { fork, takeLatest } from 'redux-saga/effects';

import timeSaga from './timeSaga';
import changeDaySaga from './changeDaySaga';

export default function* timer() {
    yield fork(timeSaga);
    yield takeLatest(CHANGE_VISIBLE_DAY, changeDaySaga);
}
