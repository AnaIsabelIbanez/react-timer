import BackendError from './BackendError';
import Api from './api';
import {storeInLocalStorage} from './utilities';

export default class ApiStorage extends Api {

    checkStatus = (url, originalOptions, { response, parsedBody }) => {
        if (response.ok) {
            return parsedBody;
        }
        switch (response.status) {
            case 401:
            case 403:
                window.location.href = '/login';
                break;
        }
        console.log('originalOptions', originalOptions.body);
        if (originalOptions && originalOptions.storageKey) {
            const value = originalOptions.storageValue ? originalOptions.storageValue : originalOptions.body;
            storeInLocalStorage(originalOptions.storageKey, value);
        }

        throw new BackendError(response, parsedBody);
    }
}
