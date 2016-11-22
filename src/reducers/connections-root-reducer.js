import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function connectionsRootReducer(state = initialState.connectionsRoot, action) {

    switch (action.type) {
        case types.CONNECTIONS_ROOT_CHANGE:
        return action.connectionsRoot;
    default:
        return state;
    }

}