import {
    ADD_TASK,
    CHANGE_TASK_NAME,
    SET_TASK,
    INCREMENT_TIME,
    INIT_TIME,
    STOP_TIME,
    RESET,
    TOGGLE_EXECUTIONS,
    STATUS_RUNNING,
    STATUS_STOPPED
} from './constants';

import { getDayByTimesptamp } from '../../utils/utilities';

const initialState = {
    currentTask: {
        name: '',
        seconds: 0,
        status: STATUS_STOPPED,
        initialTime: null,
        finalTime: null
    },
    tasks: [{
        name: 'Algo',
        seconds: 56,
        status: STATUS_STOPPED,
        initialTime: 1519136393162,
        finalTime: 1519136366826,
        executions: [{
            name: 'Algo',
            seconds: 56,
            status: STATUS_STOPPED,
            initialTime: 1519136393162,
            finalTime: 1519136366826
        }]
    }]
};

const setCurrentTask = (state, newAttributeCurrentTask) => {
    return {
        ...state,
        currentTask: {
            ...state.currentTask,
            ...newAttributeCurrentTask
        }
    };
};

const areTheSameTasks = (taskA, taskB) => {
    return taskA.name === taskB.name && getDayByTimesptamp(taskA.initialTime) ===  getDayByTimesptamp(taskB.initialTime);
};

const createNewTask = (newExecution) => {
    return {
        ...newExecution,
        executions: [{
            ...newExecution
        }]
    };
};

const addTask = (tasks, executionToAdd) => {
    const copiedTasks = [...tasks];
    const taskIndex = copiedTasks.findIndex((task) => (areTheSameTasks(task, executionToAdd)));
    if (taskIndex > -1) {
        const taskUpdate = copiedTasks[taskIndex];
        taskUpdate.finalTime = executionToAdd.finalTime;
        taskUpdate.seconds += executionToAdd.seconds;
        taskUpdate.executions.push(executionToAdd);
        taskUpdate.showExecutions = false;
    } else {
        copiedTasks.push(createNewTask(executionToAdd));
    }
    return copiedTasks;
};

const toggleExecution = (tasks, taskToUpdate) => {
    const copiedTasks = [...tasks];
    const foundTask = copiedTasks.find((task) => (areTheSameTasks(task, taskToUpdate)));
    foundTask.showExecutions = !foundTask.showExecutions;
    return copiedTasks;
};

function TimerReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_TASK_NAME:
            return setCurrentTask(state, {name: payload});
        case INCREMENT_TIME:
            return setCurrentTask(state, {seconds: state.currentTask.seconds + 1});
        case RESET:
            return setCurrentTask(state, initialState.currentTask);
        case INIT_TIME:
            return setCurrentTask(state, {status: STATUS_RUNNING, initialTime: Date.now()});
        case STOP_TIME:
            return setCurrentTask(state, {status: STATUS_STOPPED, finalTime: Date.now()});
        case SET_TASK:
            return setCurrentTask(state, {name: payload.name, seconds: 0});
        case TOGGLE_EXECUTIONS:
            return {
                ...state,
                tasks: toggleExecution(state.tasks, payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: addTask(state.tasks, payload)
            };
        default:
            return state;
    }
}

export default TimerReducer;
