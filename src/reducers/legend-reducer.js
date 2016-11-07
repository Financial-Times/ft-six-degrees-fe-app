import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function legendReducer(state = initialState.legend, action) {

    switch (action.type) {
        case types.LEGEND_UPDATE:
        return action.legend;

    default:
        return state;
    }

}