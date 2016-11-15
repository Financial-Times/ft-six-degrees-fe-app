import * as types from './action-types';

function getPeopleRangeEvent(range) {
    return {
        type: types.PEOPLE_RANGE_CHANGE,
        peopleRange: range
    };
}

export function change(range) {
    return function (dispatch) {
        dispatch(getPeopleRangeEvent(range));
    }
}