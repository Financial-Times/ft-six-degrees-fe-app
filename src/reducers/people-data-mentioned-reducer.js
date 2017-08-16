import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function peopleDataMentionedReducer(state = initialState.mentionedPeopleData, action) {

	switch (action.type) {
		case types.MENTIONED_PEOPLE_DATA_UPDATE:
			return action.mentionedPeopleData;
		case types.MENTIONED_PEOPLE_SUCCESS:
			return action.payload.people;
		default:
			return state;
	}

}
