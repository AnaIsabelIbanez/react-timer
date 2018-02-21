import Api from '../utils/api';

const api = new Api();
const baseUri = '/user';

// export const doLogin = (body) => api.post(`${baseUri}/user`, { body });
export const doLogin = (body) => body;
