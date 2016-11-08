import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function userDetailsReducer(state = initialState.user, action) {

    switch (action.type) {
        case types.USER_DETAILS_UPDATE:
        return action.user;

    default:
        return state;
    }

}