import * as types from './action-types';
import {CONFIG} from '../config-constants';
import { CALL_API, getJSON } from 'redux-api-middleware';

const API_ROOT = `${CONFIG.URL.API}api`;

const fetchConnections = (rootId, key = 'month') => ({
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

export const loadConnections = (rootId) => (dispatch, getState) => {
	const key = getState().dateRange;
	const rootIds = Object.keys(getState().connectedPeopleChain);
	if (rootId && rootIds.indexOf(rootId) === -1) {
		return Promise.resolve(dispatch(fetchConnections(rootId, key)));
	}
	return Promise.resolve(null);
};

export const resetConnections = () => ({
	type: types.RESET_CONNECTIONS
});
