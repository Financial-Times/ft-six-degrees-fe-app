import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function dateRangeReducer(state = initialState.dateRange, action) {

    switch (action.type) {
        case types.DATE_RANGE_CHANGE:
        return action.dateRange;

    default:
        return state;
    }

}