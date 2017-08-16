import * as types from './action-types';
import isEmpty from 'lodash/isEmpty';
import { CONFIG } from '../config-constants';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { getUserData } from './dd-user-actions';
import Cookies from 'services/cookies.utils';

const API_ROOT = `${CONFIG.URL.API}api`;

function getMentionedPeopleDataUpdateEvent(data) {
    return {
        type: types.MENTIONED_PEOPLE_DATA_UPDATE,
        mentionedPeopleData: data
    };
}

function getPersonalisedPeopleDataUpdateEvent(data) {
    return {
        type: types.PERSONALISED_PEOPLE_DATA_UPDATE,
        personalisedPeopleData: data
    };
}

export function updateMentioned(data) {
    return function (dispatch) {
        dispatch(getMentionedPeopleDataUpdateEvent(data));
    }
}

export function updatePersonalised(data) {
    return function (dispatch) {
        dispatch(getPersonalisedPeopleDataUpdateEvent(data));
    }
}

const fetchPersonalised = (userId, key = 'month') => ({
	[CALL_API]: {
		types: [
			types.PERSONALISED_PEOPLE_REQUEST,
			{
				type: types.PERSONALISED_PEOPLE_SUCCESS,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			types.PERSONALISED_PEOPLE_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/people-history/${key}/${userId}`
	}
});

const fetchMentioned = (key = 'month') => ({
	[CALL_API]: {
		types: [
			types.MENTIONED_PEOPLE_REQUEST,
			{
				type: types.MENTIONED_PEOPLE_SUCCESS,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			types.MENTIONED_PEOPLE_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/mentioned/${key}`
	}
});

let ftSessionCookie = '';
const isLoggedIn = () => {
	ftSessionCookie = Cookies.read('FTSession');
	return typeof ftSessionCookie === 'string' && ftSessionCookie !== '';
};

export const loadPeople = () => (dispatch, getState) => {
	const key = getState().dateRange;
	const personalisedPeople = getState().personalisedPeopleData;
	const mentionedPeople = getState().mentionedPeopleData;
	if (isLoggedIn() && isEmpty(getState().user)) {
		if (!personalisedPeople.length) {
			return dispatch(getUserData(ftSessionCookie))
				.then(() => {
					return Promise.resolve(dispatch(fetchPersonalised(getState().uuid, key)));
				});
		}
		return Promise.resolve(personalisedPeople);
	} else {
		if (!mentionedPeople.length) {
			return Promise.resolve(dispatch(fetchMentioned(key)));
		}
		return Promise.resolve(mentionedPeople);
	}

};
