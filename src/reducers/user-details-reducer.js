import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function userDetailsReducer(state = initialState.user, action) {

	switch (action.type) {
		case types.USER_DETAILS_UPDATE:
			return action.user;
		case types.USER_DATA_SUCCESS:
			console.log('user_data_success', action.payload);
			return action.payload;
		default:
			return state;
	}

}
