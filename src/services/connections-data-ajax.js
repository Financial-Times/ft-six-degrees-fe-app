import fetch from 'isomorphic-fetch';
import {CONFIG} from '../config-constants';

class ConnectionsDataAjax {
    fetch(uuid, key = 'month') {
        return fetch(CONFIG.URL.API + 'api/connections/' + key + '/' + uuid).then((response) => {
            return response.json();
        });
    }
}

export default new ConnectionsDataAjax();
