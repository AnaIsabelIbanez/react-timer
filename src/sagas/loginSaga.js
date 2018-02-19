
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {DO_LOGIN} from "../containers/Login/constants";
import { setUser } from '../containers/App/actions';

import Api from '../utils/api';
import request from '../utils/request';
import { getUsername } from '../containers/Login/selectors';

export function* doLogin() {
    const api = new Api();
    const username = yield select(getUsername());
    const requestURL = `http://api/login/${username}`;

    const getLogin = (username) => ({
        user: 'oo'
    })

    try {
        const user = yield call(getLogin, username);
        console.log('user', user);
        yield put(setUser(user));
    } catch (err) {
        // yield put(repoLoadingError(err));
    }
}

export default function* login() {
    yield takeLatest(DO_LOGIN, doLogin);
}

