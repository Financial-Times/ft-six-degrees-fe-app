import fetch from 'isomorphic-fetch';
import {CONFIG} from '../config-constants';

class PeoplePersonalisedDataAjax {
    fetch(key = 'month', uuid) {
        return fetch(CONFIG.URL.API + 'api/people-history/' + key + '/' + uuid).then((response) => {
            return response.json();
        });
    }
}

export default new PeoplePersonalisedDataAjax();