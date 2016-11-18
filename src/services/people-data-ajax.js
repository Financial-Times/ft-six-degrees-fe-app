import fetch from 'isomorphic-fetch';
import {CONFIG} from '../config-constants';

class PeopleDataAjax {
    fetchMentioned(key = 'month') {
        return fetch(CONFIG.URL.API + 'api/mentioned/' + key).then((response) => {
            return response.json();
        });
    }
}

export default new PeopleDataAjax();