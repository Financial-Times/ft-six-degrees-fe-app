import * as types from './action-types';

function getPeopleGroupEvent(group) {
    return {
        type: types.PEOPLE_GROUP_CHANGE,
        peopleGroup: group
    };
}

export function change(group) {
    return function (dispatch) {
        dispatch(getPeopleGroupEvent(group));
    }
}