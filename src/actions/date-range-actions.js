import * as types from './action-types';

function getDateRangeEvent(range) {
    return {
        type: types.DATE_RANGE_CHANGE,
        dateRange: range
    };
}

export function change(range) {
    return function (dispatch) {
        dispatch(getDateRangeEvent(range));
    }
}
