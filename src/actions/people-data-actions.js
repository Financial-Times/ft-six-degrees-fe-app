import * as types from './action-types';

function getPeopleDataEvent(data) {
    return {
        type: types.PEOPLE_DATA_UPDATE,
        peopleData: data
    };
}

export function update(data) {
    return function (dispatch) {
        dispatch(getPeopleDataEvent(data));
    }
}