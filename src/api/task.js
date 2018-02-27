import Api from '../utils/api';

const api = new Api();
const baseUri = '/task';


export const getTasks = (day) => api.get(`${baseUri}/${day.toISOString()}`);
export const updateTask = (task) => api.post('/task', {body: ''});

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
