import * as types from './action-types';
import {CONFIG} from '../config-constants';
import { CALL_API, getJSON } from 'redux-api-middleware';

const API_ROOT = `${CONFIG.URL.API}api`;

const fetchUserData = (sessionCookie) => ({
	[CALL_API]: {
		types: [
			types.USER_DATA_REQUEST,
			{
				type: types.USER_DATA_SUCCESS,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			types.USER_DATA_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/session/${sessionCookie}`
	}
});

export const getUserData = (sessionCookie) => dispatch =>
	Promise.resolve(dispatch(fetchUserData(sessionCookie)));
