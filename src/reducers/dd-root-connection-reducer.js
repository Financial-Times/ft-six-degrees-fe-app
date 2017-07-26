import * as types from '../actions/action-types';

const rootConnectionReducer = (state = {}, action) => {
	switch (action.type) {
		case types.SET_ROOT_CONNECTION:
			return action.rootConnection;
		default:
			return state;
	}
};

export default rootConnectionReducer;
