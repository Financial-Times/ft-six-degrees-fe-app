import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { createSelector } from 'reselect';
import { API_ROOT, PLACEHOLDER_IMG } from '../../config';
import { extractId } from '../../helpers/uuid';

export const CONNECTIONS_REQUEST = 'CONNECTIONS_REQUEST';
export const CONNECTIONS_SUCCESS = 'CONNECTIONS_SUCCESS';
export const CONNECTIONS_FAILURE = 'CONNECTIONS_FAILURE';

export const CONTENT_FOR_ROOT_CONNECTION_REQUEST =
	'CONTENT_FOR_ROOT_CONNECTION_REQUEST';
export const CONTENT_FOR_ROOT_CONNECTION_SUCCESS =
	'CONTENT_FOR_ROOT_CONNECTION_SUCCESS';
export const CONTENT_FOR_ROOT_CONNECTION_FAILURE =
	'CONTENT_FOR_ROOT_CONNECTION_FAILURE';

export const SET_ACTIVE_ROOT_CONNECTION = 'SET_ACTIVE_ROOT_CONNECTION';
export const SET_ROOT_CONNECTION = 'SET_ROOT_CONNECTION';
export const RESET_CONNECTIONS = 'RESET_CONNECTIONS';
export const UPDATE_CONNECTIONS = 'UPDATE_CONNECTIONS';

const getConnections = (state, props) => state.connectionsChain;
const getRootConnection = (state, props) => state.rootConnection;
// const getActiveRootConnection = (state, props) => state.activeRootConnection;

const fetchConnections = (rootId, key = 'month') => ({
	[CALL_API]: {
		types: [
			CONNECTIONS_REQUEST,
			{
				type: CONNECTIONS_SUCCESS,
				meta: rootId,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			CONNECTIONS_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/connections/${key}/${rootId}`
	}
});

const fetchContentForRootConnection = (rootId, key = 'month') => ({
	[CALL_API]: {
		types: [
			CONTENT_FOR_ROOT_CONNECTION_REQUEST,
			{
				type: CONTENT_FOR_ROOT_CONNECTION_SUCCESS,
				payload: (action, state, res) => res.ok && getJSON(res)
			},
			CONTENT_FOR_ROOT_CONNECTION_FAILURE
		],
		method: 'GET',
		endpoint: `${API_ROOT}/person-articles/${key}/${rootId}`
	}
});

const activeRootConnection = connection => ({
	type: SET_ACTIVE_ROOT_CONNECTION,
	connection
});

const rootConnection = connection => ({
	type: SET_ROOT_CONNECTION,
	connection
});

const getPerson = (personId, people) => {
	return people[`${people.peopleSelector}People`].find(
		c => extractId(c.id) === personId
	);
};

const updateConnections = connections => ({
	type: UPDATE_CONNECTIONS,
	connections
});

export const loadConnections = rootId => (dispatch, getState) => {
	const key = getState().people.dateRange;
	const connectionsChain = getState().connections.connectionsChain;
	const rootIds = Object.keys(connectionsChain);
	const rootIdIdx = rootIds.indexOf(rootId);
	if (isEmpty(connectionsChain)) {
		return Promise.resolve(dispatch(fetchConnections(rootId, key)));
	} else {
		const allowedIds = connectionsChain[
			rootIds[rootIds.length - 1]
		].map(c => extractId(c.person.id));
		if (
			rootIds.indexOf(rootId) === -1 &&
			allowedIds.indexOf(rootId) !== -1
		) {
			return Promise.resolve(dispatch(fetchConnections(rootId, key)));
		} else {
			if (rootIdIdx !== -1) {
				const updatedConnections = rootIds
					.slice(0, rootIdIdx + 1)
					.reduce((agg, id) => {
						return { ...agg, [id]: connectionsChain[id] };
					}, {});
				return Promise.resolve(
					dispatch(updateConnections(updatedConnections))
				);
			}
		}
	}
	return Promise.resolve(null);
};

const findActiveRootConnection = (id, connectionsChain) => {
	const haystack = [].concat(...values(connectionsChain));
	return haystack.find(c => extractId(c.person.id) === id);
};

export const setActiveRootConnection = personId => (dispatch, getState) => {
	let connection = findActiveRootConnection(
		personId,
		getState().connections.connectionsChain
	);

	if (!connection) {
		connection = getState().connections.rootConnection;
	}

	return Promise.resolve(dispatch(activeRootConnection(connection)));
};

export const setRootConnection = rootPersonId => (dispatch, getState) => {
	const rootPerson = getPerson(rootPersonId, getState().people);
	const key = getState().people.dateRange;
	return Promise.resolve(
		dispatch(fetchContentForRootConnection(rootPersonId, key))
	).then(() => {
		if (rootPerson) {
			return Promise.resolve(dispatch(rootConnection(rootPerson)));
		}
	});
};

export const resetConnections = () => dispatch => {
	return Promise.resolve(
		dispatch({
			type: RESET_CONNECTIONS
		})
	);
};

const getNodeProps = node => {
	return {
		id: extractId(node.id),
		borderWidth: 3,
		color: node.isRoot ? '#1A636B' : '#B8B5AE',
		label: node.abbrName,
		size: node.isRoot ? 40 : 20,
		shape: 'circularImage',
		image: node.img || PLACEHOLDER_IMG
	};
};
export const getGraphNodes = () => {
	return createSelector(
		[getConnections, getRootConnection],
		(connections, rootConnection) => {
			let graphNodes = [];
			const rootIds = Object.keys(connections);
			rootConnection = {
				...rootConnection,
				person: { ...rootConnection.person, isRoot: true }
			};
			rootIds.forEach(rootId => {
				let conns = connections[rootId]
					.map(c => ({
						...c.person,
						isRoot: rootIds.indexOf(extractId(c.person.id)) > -1
					}))
					.map(getNodeProps);
				graphNodes.push(...conns, getNodeProps(rootConnection.person));
			});
			return [...graphNodes];
		}
	);
};

const getEdges = (node, rootId) => {
	return {
		from: rootId,
		width: node.isRoot ? 2 : 1,
		length: node.isRoot ? undefined : 80,
		color: node.isRoot ? '#1A636B' : '#B8B5AE',
		to: extractId(node.id)
	};
};

export const getGraphEdges = () => {
	return createSelector([getConnections], connections => {
		let graphEdges = [];
		const rootIds = Object.keys(connections);
		rootIds.forEach(rootId => {
			let edges = connections[rootId]
				.map(c => ({
					...c.person,
					isRoot: rootIds.indexOf(extractId(c.person.id)) > -1
				}))
				.map(person => getEdges(person, rootId));
			graphEdges.push(...edges);
		});
		return [...graphEdges];
	});
};

export const getRelatedContent = () => {
	return createSelector(
		[getRootConnection, getConnections],
		(rootConnection, connections) => {
			return Object.keys(connections).reduce((agg, rootId, connIdx) => {
				const dataToAdd =
					connIdx === 0
						? rootConnection
						: findActiveRootConnection(rootId, connections);
				agg = { ...agg, [rootId]: dataToAdd };
				return agg;
			}, {});
		}
	);
};

const connection = {
	person: {},
	content: {}
};
const initialState = {
	isFetching: false,
	error: '',
	activeRootConnection: connection,
	lastActiveRootConnection: {},
	connectionsChain: {},
	rootConnection: connection
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CONTENT_FOR_ROOT_CONNECTION_REQUEST:
		case CONNECTIONS_REQUEST:
			return action.error
				? {
						...state,
						isFetching: false,
						error: action.payload.message
					}
				: {
						...state,
						isFetching: true
					};
		case CONNECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: 'Something went wrong while getting connections'
			};
		case CONNECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				connectionsChain: {
					...state.connectionsChain,
					[action.meta]: isEmpty(action.payload) ? [] : action.payload
				}
			};
		case UPDATE_CONNECTIONS:
			return {
				...state,
				connectionsChain: action.connections
			};
		case CONTENT_FOR_ROOT_CONNECTION_FAILURE:
			return {
				...state,
				isFetching: false,
				error:
					'Something went wrong while getting articles for root connection'
			};
		case CONTENT_FOR_ROOT_CONNECTION_SUCCESS:
			return {
				...state,
				isFetching: false,
				rootConnection: {
					...rootConnection,
					content: action.payload
				}
			};
		case SET_ACTIVE_ROOT_CONNECTION:
			return {
				...state,
				activeRootConnection: action.connection
			};
		case SET_ROOT_CONNECTION:
			return {
				...state,
				rootConnection: {
					...state.rootConnection,
					person: action.connection
				}
			};
		case RESET_CONNECTIONS:
			return {
				...state,
				connectionsChain: initialState.connectionsChain,
				rootConnection: initialState.rootConnection,
				activeRootConnection: initialState.activeRootConnection
			};
		default:
			return state;
	}
};
