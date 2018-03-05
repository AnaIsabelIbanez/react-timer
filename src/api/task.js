import Api from '../utils/api';
import ApiStorage from '../utils/apiStorage';
import {TASK_STORAGE_KEY} from '../containers/TimerPage/constants';


const api = new ApiStorage();
const baseUri = '/task';


export const getTasks = (day) => api.get(`${baseUri}/${day.toISOString()}`);
export const createExecution = (task) => api.post('/execution', {body: {execution: task}, storageKey: 'NOOO', storageValue: task});
export const updateExecution = (changedAttribute) => api.put('/execution', {body: changedAttribute});

// example
// [{
//     name: 'Algo',
//     seconds: 56,
//     status: 'stopped',
//     initialTime: 1519136393162,
//     finalTime: 1519136366826,
//     executions: [{
//         name: 'Algo',
//         seconds: 56,
//         status: 'stopped',
//         initialTime: 1519136393162,
//         finalTime: 1519136366826
//     }, {
//         name: 'Algo',
//         seconds: 56,
//         status: 'stopped',
//         initialTime: 1519136393162,
//         finalTime: 1519136366826
//     }]
// }, {
//     name: 'Algo2',
//     seconds: 56,
//     status: 'stopped',
//     initialTime: 1419136393162,
//     finalTime: 1419136366826,
//     executions: [{
//         name: 'Algo',
//         seconds: 56,
//         status: 'stopped',
//         initialTime: 1519136393162,
//         finalTime: 1519136366826
//     }, {
//         name: 'Algo',
//         seconds: 56,
//         status: 'stopped',
//         initialTime: 1519136393162,
//         finalTime: 1519136366826
//     }]
// }
// ];
