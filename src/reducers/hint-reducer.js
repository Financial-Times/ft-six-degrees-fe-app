import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function hintReducer(state = initialState.hint, action) {

    switch (action.type) {
        case types.HINT_UPDATE:
        return action.hint;

    default:
        return state;
    }

}