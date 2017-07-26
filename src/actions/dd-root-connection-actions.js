import * as types from './action-types';
import UuidUtils from '../services/uuid.utils';

const rootConnection = connection => ({
	type: types.SET_ROOT_CONNECTION,
	rootConnection: connection
});

const getConnectionsRoot = (id, {personalisedPeopleData, mentionedPeopleData}) => {
	const haystack = [...personalisedPeopleData, ...mentionedPeopleData];
	return haystack.find(p => UuidUtils.extract(p.id) === id);
};

export const setRootConnection = (rootPersonId) => (dispatch, getState) => {
	const rootPerson = getConnectionsRoot(rootPersonId, getState());
	return Promise.resolve(dispatch(rootConnection(rootPerson)));
};
