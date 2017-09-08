import { CALL_API, getJSON } from 'redux-api-middleware';
import isEmpty from 'lodash/isEmpty';
import { API_ROOT } from '../../config';
import Cookies from '../../helpers/cookie';

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_FAILURE = 'USER_FAILURE';

const fetchUserData = sessionCookie => ({
	[CALL_API]: {
		types: [
			USER_REQUEST,
			{
				type: USER_SUCCESS,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			USER_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/session/${sessionCookie}`
	}
});

export const getUserData = () => (dispatch, getState) => {
	const userInfo = getState().user.info;
	let ftSessionCookie = '';

	if (!isEmpty(userInfo)) {
		return Promise.resolve();
	}

	const isLoggedIn = () => {
		ftSessionCookie = Cookies.read('FTSession');
		return typeof ftSessionCookie === 'string' && ftSessionCookie !== '';
	};
	return isLoggedIn()
		? dispatch(fetchUserData(ftSessionCookie))
		: Promise.resolve();
};

const initialState = {
	isFetching: false,
	error: '',
	isAuthed: false,
	info: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_REQUEST:
			if (action.error) {
				return {
					...state,
					isFetching: false,
					error: action.payload.message
				};
			}
			return {
				...state,
				isFetching: true
			};
		case USER_FAILURE:
			return {
				...state,
				isFetching: false,
				isAuthed: false,
				error: action.payload.message
			};
		case USER_SUCCESS:
			return {
				...state,
				isFetching: false,
				isAuthed: true,
				info: action.payload
			};
		default:
			return state;
	}
};
