import {actionChannel, call, take, put, race, select, fork, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {incrementTime, reset, initTime, changeVisibleDay} from '../actions';
import {showModal} from '../../App/actions';
import {updateTask} from '../../../api/task';
import {getCurrentTask} from '../selectors';
import {STOP_TIME, SET_TASK} from '../constants';

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
                try {
                    //TODO manejo de errores
                    yield call(updateTask, currentTask);
                    yield put(reset());
                    yield put(changeVisibleDay(0));
                } catch (err) {
                    yield put(showModal({
                        title: 'Error ocurred',
                        message: err.message || 'Something went wrong, please try again',
                        type:'error'
                    }));
                }
                break;
            }
        }
    }
};
