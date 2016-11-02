import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
    if (action.type === types.BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (action.type === types.AJAX_CALL_ERROR || action.type === types.AJAX_CALL_SUCCESS) {
        return state - 1;
    }

    return state;
}