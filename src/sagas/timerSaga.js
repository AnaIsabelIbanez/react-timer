import { actionChannel, call, take, put, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
// import { incrementTime, reset, initTime } from '../containers/CurrentTask/actions';
import { addTask, incrementTime, reset, initTime } from '../containers/TimerPage/actions';
import { getCurrentTask } from '../containers/TimerPage/selectors';
import { STOP_TIME } from '../containers/TimerPage/constants';

import { SET_TASK } from '../containers/CurrentTask/constants';

export default function* runTimer() {
    const channel = yield actionChannel(SET_TASK);

    while (yield take(channel)) {
        yield put(initTime());
        while (true) {
            const winner = yield race({
                stopped: take(STOP_TIME),
                running: call(delay, 1000)
            });

            if (!winner.stopped) {
                yield put(incrementTime());
            } else {
                const currentTask = yield select(getCurrentTask());
                yield put(addTask(currentTask));
                yield put(reset());
                break;
            }
        }
    }
};
