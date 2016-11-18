import * as types from './action-types';

function getPeopleDataUpdateEvent(data) {
    return {
        type: types.PEOPLE_DATA_UPDATE,
        peopleData: data
    };
}

export function update(data) {
    return function (dispatch) {
        dispatch(getPeopleDataUpdateEvent(data));
    }
}