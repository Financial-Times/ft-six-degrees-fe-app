import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function peopleDataPersonalisedReducer(state = initialState.personalisedPeopleData, action) {

	console.log(action);
	switch (action.type) {
		case types.PERSONALISED_PEOPLE_DATA_UPDATE:
			return action.personalisedPeopleData;
		case types.PERSONALISED_PEOPLE_SUCCESS:
			return action.payload;
		default:
			return state;
	}

}
