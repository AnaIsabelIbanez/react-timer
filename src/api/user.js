import Api from '../utils/api';

const api = new Api();
const baseUri = '/login';

export const doLogin = (body) => api.post(`${baseUri}`, {body});
