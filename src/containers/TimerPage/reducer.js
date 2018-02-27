import {
    ADD_TASK,
    CHANGE_CURRENT_TASK_NAME,
    SET_TASK,
    INCREMENT_TIME,
    INIT_TIME,
    STOP_TIME,
    RESET,
    TOGGLE_EXECUTIONS,
    STATUS_RUNNING,
    STATUS_STOPPED,
    TOGGLE_ALL_EXECUTIONS,
    CHANGE_VISIBLE_DAY,
    SET_TASKS,
    CHANGE_TASK_NAME
} from './constants';

import {getDayByTimesptamp, addDays, getTimeStampByIsoString} from '../../utils/utilities';
import moment from 'moment/moment';

const initialState = {
    currentTask: {
        name: '',
        seconds: 0,
        status: STATUS_STOPPED,
        initialTime: null,
        finalTime: null
    },
    tasks: [],
    showAll: false,
    visibleDay: moment()
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
    return taskA.name === taskB.name && getDayByTimesptamp(taskA.initialTime) === getDayByTimesptamp(taskB.initialTime);
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

const changeAllExecutions = (tasks = [], attribute, value) => {
    return tasks.map((task) => {
        task[attribute] = value;
        return task;
    });
};

const toggleExecution = (tasks, taskToUpdate) => {
    const copiedTasks = [...tasks];
    const foundTask = copiedTasks.find((task) => (areTheSameTasks(task, taskToUpdate)));
    foundTask.showExecutions = !foundTask.showExecutions;
    return copiedTasks;
};

const updateTaskName = (tasks, taskToUpdate, attribute, value) => {
    const copiedTasks = [...tasks];
    const task = copiedTasks.find((task) => (areTheSameTasks(task, taskToUpdate)));
    task[attribute] = value;
    task.executions = changeAllExecutions(task.executions, 'name', value);
    return copiedTasks;
};

const getTasks = (tasks) => {
    return tasks.map((task) => {
        task.initialTime = getTimeStampByIsoString(task.initialTime);
        task.finalTime = getTimeStampByIsoString(task.finalTime);
        task.executions = task.executions.map((execution) => {
            execution.initialTime = getTimeStampByIsoString(execution.initialTime);
            execution.finalTime = getTimeStampByIsoString(execution.finalTime);
            return execution;
        });
        return task;
    });
};

function TimerReducer(state = initialState, {type, payload}) {

    switch (type) {
        case CHANGE_CURRENT_TASK_NAME:
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
        case TOGGLE_ALL_EXECUTIONS:
            const newShowAll = !state.showAll;
            return {
                ...state,
                showAll: newShowAll,
                tasks: changeAllExecutions(state.tasks, 'showExecutions', newShowAll)
            };
        case TOGGLE_EXECUTIONS:
            return {
                ...state,
                tasks: toggleExecution(state.tasks, payload)
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: addTask(state.tasks, payload)
            };
        case CHANGE_VISIBLE_DAY:
            return {
                ...state,
                visibleDay: addDays(state.visibleDay, payload)
            };
        case SET_TASKS:
            return {
                ...state,
                tasks: getTasks(payload)
            };
        case CHANGE_TASK_NAME:
            return {
                ...state,
                tasks: updateTaskName(state.tasks, payload.task, 'name', payload.value)
            };
        default:
            return state;
    }
}

export default TimerReducer;
