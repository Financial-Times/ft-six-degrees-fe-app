import * as types from './action-types';
import UuidUtils from '../services/uuid.utils';
import { CONFIG } from '../config-constants';
import { CALL_API, getJSON } from 'redux-api-middleware';

const API_ROOT = `${CONFIG.URL.API}api`;

const rootConnection = connection => ({
	type: types.SET_ROOT_CONNECTION,
	rootConnection: connection
});

const getConnectionsRoot = (id, { personalisedPeopleData, mentionedPeopleData }) => {
	const haystack = [...personalisedPeopleData, ...mentionedPeopleData];
	return haystack.find(p => UuidUtils.extract(p.id) === id);
};

const fetchArticlesForRoot = (rootId, key = 'month') => ({
	[CALL_API]: {
		types: [
			types.CONNECTIONS_REQUEST,
			{
				type: types.CONNECTIONS_SUCCESS,
				meta: rootId,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			types.CONNECTIONS_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/connections/${key}/${rootId}`
	}
});

export const setRootConnection = (rootPersonId) => (dispatch, getState) => {

	if (rootPersonId === null) {
		return Promise.resolve(dispatch(rootConnection({})));
	}

	const rootPerson = getConnectionsRoot(rootPersonId, getState());

	if (rootPerson) {
		return Promise.resolve(dispatch(rootConnection(rootPerson)));
	}
};
