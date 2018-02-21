import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {DO_LOGIN} from './constants';
import { setUser } from '../App/actions';
import { getUsername } from './selectors';

export function* doLogin() {
    const username = yield select(getUsername());
    const requestURL = `http://api/login/${username}`;

    const getLogin = (username) => ({
        user: username
    })

    try {
        const user = yield call(getLogin, username);
        yield put(setUser(user));
        yield put(push('/timer'));
    } catch (err) {
        console.log('error in login');
    }
}

export default function* login() {
    yield takeLatest(DO_LOGIN, doLogin);
}

