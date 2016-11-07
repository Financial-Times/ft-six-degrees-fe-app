import * as types from './action-types';

function getHintEvent(hint) {
    return {
        type: types.HINT_UPDATE,
        hint: hint
    };
}

export function change(hint) {
    return function (dispatch) {
        dispatch(getHintEvent(hint));
    }
}