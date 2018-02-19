import { fork } from 'redux-saga/effects';
import login from './loginSaga';
import timer from './timerSaga';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* watchLogin() {
    yield fork(login);
    yield fork(timer);
}
