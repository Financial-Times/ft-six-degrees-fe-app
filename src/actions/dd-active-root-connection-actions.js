import * as types from './action-types';
import values from 'lodash/values';
import UuidUtils from '../services/uuid.utils'

export const activeRootConnection = (connection) => ({
	type: types.SET_ACTIVE_ROOT_CONNECTION,
	connection
});


const getActiveRootConnection = (id, { connectedPeopleChain }) => {
	const haystack = [].concat(...values(connectedPeopleChain));
	return haystack.find(c => UuidUtils.extract(c.person.id) === id);
};

export const setActiveRootConnection = (personId) => (dispatch, getState) => {
	let rootPerson = getActiveRootConnection(personId, getState());
	if (!rootPerson) {
		rootPerson = getState().rootConnection;
	}
	return Promise.resolve(dispatch(activeRootConnection(rootPerson)));
};

