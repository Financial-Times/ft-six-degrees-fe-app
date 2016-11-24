import fetch from 'isomorphic-fetch';
import {CONFIG} from '../config-constants';

class PersonArticlesAjax {
    fetch(uuid, key = 'month') {
        return fetch(CONFIG.URL.API + 'api/person-articles/' + key + '/' + uuid).then((response) => {
            return response.json();
        });
    }
}

export default new PersonArticlesAjax();