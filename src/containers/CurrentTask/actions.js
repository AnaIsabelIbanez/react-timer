import { SET_TASK, CHANGE_TASK_NAME } from './constants';

export const changeTaskName = (taskName) => ({
    type: CHANGE_TASK_NAME,
    payload: taskName
});
