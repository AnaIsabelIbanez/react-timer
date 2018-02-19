import {
    ADD_TASK
} from '../TimerPage/constants';
import { getDayByTimesptamp } from '../../utils/utilities';

const initialState = {
    tasks: []
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

function TaskListReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: addTask(state.tasks, payload)
            };
        default:
            return state;
    }
};

export default TaskListReducer;
