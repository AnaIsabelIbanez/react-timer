import {call, put, select, actionChannel, take} from 'redux-saga/effects';

import {addNoPersistedTask, changeVisibleDay, removeTaskToAdd, removeNoPersist, setTaskToAdd} from '../actions';
import {getTaskToAdd} from '../selectors';
import {updateTask} from '../../../api/task';
import {showError} from '../../App/actions';


export default function* addTask() {
    const {task} = yield select(getTaskToAdd());
    yield put(removeNoPersist(task));
    try {
        yield call(updateTask, task);
        yield put(changeVisibleDay(0));
    } catch (error) {
        yield put(showError(error));
        yield put(addNoPersistedTask(task));
        yield put(setTaskToAdd(task));
    } finally {
        yield put (removeTaskToAdd());
    }
}


// export default function* addTask() {
//     const chanel = yield actionChannel('SET_TASK_TO_ADD');
//     while (true) {
//
//         const {payload} = yield take(chanel);
//         const task = payload;
//         //const {task} = yield select(getTaskToAdd());
//         yield put(removeNoPersist(task));
//         try {
//             yield call(updateTask, task);
//             yield put(changeVisibleDay(0));
//         } catch (error) {
//             yield put(showError(error));
//             yield put(addNoPersistedTask(task));
//             yield put(setTaskToAdd(task));
//         } finally {
//             yield put(removeTaskToAdd());
//             break;
//         }
//     }
// }
