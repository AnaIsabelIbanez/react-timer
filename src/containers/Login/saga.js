import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {DO_LOGIN} from './constants';
import { setUser } from '../App/actions';
import { getUsername } from './selectors';
import { doLogin as apiLogin } from '../../api/user';

export function* doLogin() {
    const username = yield select(getUsername());

    try {
        const user = yield call(apiLogin, { username });
        yield put(setUser(user));
        yield put(push('/timer'));
    } catch (err) {
        console.log('error in login');
    }
}

export default function* login() {
    yield takeLatest(DO_LOGIN, doLogin);
}

