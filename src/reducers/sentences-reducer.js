import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function sentencesReducer(state = initialState.sentences, action) {

    switch (action.type) {

    case types.LOAD_SENTENCES_SUCCESS:
        return action.sentences;

    default:
        return state;
    }

}