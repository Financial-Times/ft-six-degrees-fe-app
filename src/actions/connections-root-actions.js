import * as types from './action-types';

function getConnectionsRootChangeEvent(newRoot) {
    return {
        type: types.CONNECTIONS_ROOT_CHANGE,
        connectionsRoot: newRoot
    };
}

export function change(newRoot) {
    return function (dispatch) {
        dispatch(getConnectionsRootChangeEvent(newRoot));
    }
}