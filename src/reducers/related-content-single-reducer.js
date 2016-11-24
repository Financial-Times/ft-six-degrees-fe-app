import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function hintReducer(state = initialState.relatedContentSingle, action) {

    switch (action.type) {
        case types.RELATED_CONTENT_SINGLE_UPDATE:
        return action.relatedContentSingle;

    default:
        return state;
    }

}