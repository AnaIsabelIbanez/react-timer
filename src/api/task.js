import Api from '../utils/api';

const api = new Api();
const baseUri = '/task';

export const getTasks = (body) => api.get(baseUri);
