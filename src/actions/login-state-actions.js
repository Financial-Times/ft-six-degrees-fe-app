import * as types from './action-types';

function getLoginStateEvent(status) {
    return {
        type: types.LOGIN_STATE_CHANGE,
        loginState: status
    };
}

export function loginStateUpdate(status) {
    return function (dispatch) {
        dispatch(getLoginStateEvent(status));
    }
}