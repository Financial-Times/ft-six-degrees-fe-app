import { CALL_API, getJSON } from 'redux-api-middleware';
import { API_ROOT, PEOPLE_SELECTOR } from '../../config';

const MENTIONED_PEOPLE_REQUEST = 'MENTIONED_PEOPLE_REQUEST';
const MENTIONED_PEOPLE_SUCCESS = 'MENTIONED_PEOPLE_SUCCESS';
const MENTIONED_PEOPLE_FAILURE = 'MENTIONED_PEOPLE_FAILURE';

const PERSONALISED_PEOPLE_REQUEST = 'PERSONALISED_PEOPLE_REQUEST';
const PERSONALISED_PEOPLE_SUCCESS = 'PERSONALISED_PEOPLE_SUCCESS';
const PERSONALISED_PEOPLE_FAILURE = 'PERSONALISED_PEOPLE_FAILURE';

const PEOPLE_SELECTOR_CHANGE = 'PEOPLE_SELECTOR_CHANGE';
const PEOPLE_DATE_RANGE_CHANGE = 'PEOPLE_DATE_RANGE_CHANGE';
const SET_PEOPLE_ERROR = 'SET_PEOPLE_ERROR';
const SET_FOCUSED_PERSON_INDEX = 'SET_FOCUSED_PERSON_INDEX';

const fetchMentioned = (key = 'month') => ({
	[CALL_API]: {
		types: [
			MENTIONED_PEOPLE_REQUEST,
			{
				type: MENTIONED_PEOPLE_SUCCESS,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			MENTIONED_PEOPLE_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/mentioned/${key}`
	}
});

export const peopleSelectorChange = val => dispatch => {
	return Promise.resolve(
		dispatch({
			type: PEOPLE_SELECTOR_CHANGE,
			selector: val
		})
	).then(() => dispatch(loadPeople()));
};

export const peopleDateRangeChange = val => dispatch => {
	return Promise.resolve(
		dispatch({
			type: PEOPLE_DATE_RANGE_CHANGE,
			range: val
		})
	).then(() => dispatch(loadPeople()));
};

export const loadMentionedPeople = () => (dispatch, getState) => {
	const dateRange = getState().people.dateRange;
	return Promise.resolve(dispatch(fetchMentioned(dateRange)));
};

export const setPeopleError = (error = '') => dispatch =>
	Promise.resolve(
		dispatch({
			type: SET_PEOPLE_ERROR,
			error
		})
	);

export const loadPeople = () => (dispatch, getState) => {
	const { peopleSelector } = getState().people;
	switch (peopleSelector) {
		case PEOPLE_SELECTOR.DEFAULT.VAL:
			return dispatch(loadMentionedPeople());
		default:
			return Promise.resolve();
	}
};

const sortAndFilterPeople = people => {
	return people
		.filter(p => parseInt(p.articles, 10) > 0)
		.sort((a, b) => parseInt(b.articles, 10) - parseInt(a.articles, 10));
};

export const setFocusedPersonIndex = index => dispatch => {
	return Promise.resolve(
		dispatch({
			type: SET_FOCUSED_PERSON_INDEX,
			index
		})
	);
};

const initialState = {
	isFetching: false,
	error: '',
	dateRange: 'month',
	peopleSelector: PEOPLE_SELECTOR.DEFAULT.VAL,
	mentionedPeople: [],
	focusedPersonIndex: 0
};

export default (state = initialState, action) => {
	switch (action.type) {
		case MENTIONED_PEOPLE_REQUEST:
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
		case MENTIONED_PEOPLE_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.message
			};
		case MENTIONED_PEOPLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: '',
				mentionedPeople: sortAndFilterPeople(
					action.payload.people || action.payload
				)
			};
		case PERSONALISED_PEOPLE_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case PERSONALISED_PEOPLE_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload.message
			};
		case PERSONALISED_PEOPLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: '',
				personalisedPeople: sortAndFilterPeople(
					action.payload.people || action.payload
				)
			};
		case PEOPLE_SELECTOR_CHANGE:
			return {
				...state,
				focusedPersonIndex: 0,
				peopleSelector: action.selector
			};
		case PEOPLE_DATE_RANGE_CHANGE:
			return {
				...state,
				focusedPersonIndex: 0,
				dateRange: action.range
			};
		case SET_FOCUSED_PERSON_INDEX:
			return {
				...state,
				focusedPersonIndex: action.index
			};
		case SET_PEOPLE_ERROR:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};
