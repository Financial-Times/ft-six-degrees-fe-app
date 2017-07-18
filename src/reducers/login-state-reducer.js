import * as types from '../actions/action-types';

export default function loginStateReducer(state = false, action) {

	switch (action.type) {
		case types.LOGIN_STATE_CHANGE:
			return action.loginState;

		default:
			return state;
	}

}
