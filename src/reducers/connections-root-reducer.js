import * as types from '../actions/action-types';

export default function connectionsRootReducer(state = {}, action) {
	switch (action.type) {
		case types.SET_ACTIVE_ROOT_CONNECTION:
			return action.connection;
		case types.CONNECTIONS_ROOT_CHANGE:
			return action.connectionsRoot;
		default:
			return state;
	}
}
