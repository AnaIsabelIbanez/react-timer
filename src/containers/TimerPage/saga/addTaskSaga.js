import {call, put, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {addTask, removeExecutionToAdd, setExecutionToAdd, changeNoPersisted} from '../actions';
import {removeFromLocalStorage, storeInLocalStorage, findStorageItems, getMomentByIsoString} from '../../../utils/utilities';
import {TASK_STORAGE_KEY} from '../constants';
import {getExecutionToAdd, getTaskToRetry, getTaskToChangeName} from '../selectors';
import {createExecution, updateExecution} from '../../../api/task';
import {showError} from '../../App/actions';


export function* addTaskSaga() {
    let taskToAdd = yield select(getExecutionToAdd());
    const retried = taskToAdd.noPersisted === true;
    try {
        const createdTask = yield call(createExecution, taskToAdd);
        removeFromLocalStorage(`${TASK_STORAGE_KEY}${createdTask.initialTime}`);
        taskToAdd = createdTask;
    } catch (error) {
        taskToAdd.noPersisted = true;
        storeInLocalStorage(`${TASK_STORAGE_KEY}${taskToAdd.initialTime}`, taskToAdd);
        yield put(showError(error));
    } finally {
        yield put(addTask(taskToAdd, retried));
        yield put(removeExecutionToAdd());
    }
}


const parsedTaskFromBackendOrStorage = (task) => {
    task.initialTime = getMomentByIsoString(task.initialTime);
    task.finalTime = getMomentByIsoString(task.finalTime);
    if (task.executions) {
        task.executions = task.executions.map((execution) => {
            execution.initialTime = getMomentByIsoString(execution.initialTime);
            execution.finalTime = getMomentByIsoString(execution.finalTime);
            return execution;
        });
    }
    return task;
};

const getParsedTasks = (tasks) => {
    return tasks.map((task) => {
        return parsedTaskFromBackendOrStorage(task);
    });
};

const getTasksFromStorage = () => {
    const storageTasksNoParsed = findStorageItems(TASK_STORAGE_KEY).map((task) => task.val);
    return getParsedTasks(storageTasksNoParsed);
};

export function* retryAddSaga() {

    while (true) {
        const noPersistedTasks = getTasksFromStorage();
        const taskNumber = noPersistedTasks.length;

        for (let i = 0; i < taskNumber; i++) {
            const task = noPersistedTasks[i];
            try {
                yield call(createExecution, task);
                delete task.noPersisted;
                yield put(addTask(task, true));
                removeFromLocalStorage(`${TASK_STORAGE_KEY}${task.initialTime}`);
            } catch (error) {
            } finally {
                yield call(delay, 20000);
            }
        };

        yield call(delay, 20000);
    }
};

export function* retryExecutionsTaskSaga() {
    const taskToRetry = yield select(getTaskToRetry());
    const {executions} = taskToRetry;
    const noPersistedExecutions = executions.filter((exec) => exec.noPersisted === true);
    for (let i = 0; i < noPersistedExecutions.length; i++) {
        yield put(setExecutionToAdd(noPersistedExecutions[i]));
    }
};

export function* changeTaskNameSaga() {
    const task = yield select(getTaskToChangeName());
    const {executions} = task;
    try {
        yield call(updateExecution, executions[0]);

        for (let i = 0; i < executions.length; i++) {
            removeFromLocalStorage(`${TASK_STORAGE_KEY}${executions[i].initialTime}`);
        }
    } catch (error) {
        for (let i = 0; i < executions.length; i++) {
            const execution = executions[i];
            execution.noPersisted = true;
            storeInLocalStorage(`${TASK_STORAGE_KEY}${execution.initialTime}`, execution);
        }
        yield put(changeNoPersisted(task));
        yield put(showError(error));
    };
};

