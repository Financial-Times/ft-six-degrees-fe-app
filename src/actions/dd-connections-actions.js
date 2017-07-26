import * as types from './action-types';
import {CONFIG} from '../config-constants';
import { CALL_API, getJSON } from 'redux-api-middleware';

import { setActiveRootConnection } from './dd-active-root-connection-actions';

const API_ROOT = `${CONFIG.URL.API}api`;

//TODO: make the key dynamic
const key = 'month';

const fetchConnections = rootId => ({
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

	return Promise.resolve(dispatch(fetchConnections(rootId)))
		.then(() => dispatch(setActiveRootConnection(rootId)));
};

export const resetConnections = () => ({
	type: types.RESET_CONNECTIONS
});
