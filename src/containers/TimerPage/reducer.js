import {
    ADD_TASK,
    CHANGE_TASK_NAME,
    SET_TASK,
    INCREMENT_TIME,
    INIT_TIME,
    STOP_TIME,
    RESET
} from './constants';

import { getDayByTimesptamp } from '../../utils/utilities';

const initialState = {
    currentTask: {
        name: '',
        seconds: 0,
        status: 'Stopped',
        initialTime: null,
        finalTime: null
    },
    tasks: []
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
    } else {
        copiedTasks.push(createNewTask(executionToAdd));
    }
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
            return setCurrentTask(state, {status: 'Running', initialTime: Date.now()});
        case STOP_TIME:
            return setCurrentTask(state, {status: 'Stopped', finalTime: Date.now()});
        case SET_TASK:
            return setCurrentTask(state, {name: payload.name, seconds: 0});
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
