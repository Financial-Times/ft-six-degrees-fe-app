import * as types from './action-types';

export function change(range) {
	return {
		type: types.PEOPLE_RANGE_CHANGE,
		peopleRange: range
	};
}
