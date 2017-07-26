import * as types from '../actions/action-types';

const activeRootConnectionReducer = (state = {}, action) => {
	switch (action.type) {
		case types.SET_ACTIVE_ROOT_CONNECTION:
			return action.connection;
		default:
			return state;
	}
};

export default activeRootConnectionReducer;
