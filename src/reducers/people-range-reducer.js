import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function peopleRangeReducer(state = initialState.peopleRange, action) {

    switch (action.type) {
        case types.PEOPLE_RANGE_CHANGE:
			return action.peopleRange;
		default:
			return state;
    }

}
