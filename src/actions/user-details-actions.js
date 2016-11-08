import * as types from './action-types';

function getUserDetailsEvent(user) {
    return {
        type: types.USER_DETAILS_UPDATE,
        user: user
    };
}

export function change(user) {
    return function (dispatch) {
        dispatch(getUserDetailsEvent(user));
    }
}