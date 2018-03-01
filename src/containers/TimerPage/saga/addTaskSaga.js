import {call, put, select, actionChannel, take} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {addTask, changeVisibleDay, removeTaskToAdd, removeNoPersist, setTaskToAdd} from '../actions';
import {getTaskToAdd, getTasks} from '../selectors';
import {updateTask} from '../../../api/task';
import {showError} from '../../App/actions';


export default function* addTaskSaga() {
    const {task} = yield select(getTaskToAdd());
    const tasks = yield select(getTasks());
    const noPersistedTasks = tasks.filter((task) => task.noPersisted === true);
    noPersistedTasks.push({...task, noPersisted: true});
    yield put(removeNoPersist(task));
    let ok = false;
    for (let i = 1; i <= 5; i++) {
        try {
            yield call(updateTask, task, noPersistedTasks);
            ok = true;
        } catch (error) {
            task.noPersisted = true;
            if (i < 5) {
                yield call(delay, 2000);
            } else {
                yield put(showError(error));
            }
        } finally {
            if (ok === true || i === 5) {
                yield put(addTask(task));
                yield put(removeTaskToAdd());
                return;
            }
        }
    }
}
