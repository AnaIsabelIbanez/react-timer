import { call, put, select, takeLatest } from 'redux-saga/effects';

import {DO_LOGIN} from './constants';
import { setUser } from '../App/actions';
import { getUsername, getPassword } from './selectors';
import { doLogin as apiLogin } from '../../api/user';


export function* doLogin() {
    const username = yield select(getUsername());
    const password = yield select(getPassword());

    try {
        const user = yield call(apiLogin, { username, password });
        yield put(setUser(user));
    } catch (err) {
        console.log('error in login');
    }
}

export default function* login() {
    yield takeLatest(DO_LOGIN, doLogin);
}
