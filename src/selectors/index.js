import { createSelector } from 'reselect';
import { CONFIG } from '../config-constants';
import UuidUtils from '../services/uuid.utils';
import isEmpty from 'lodash/isEmpty';

const getConnections = (state, props) => state.connectedPeopleChain;
const getRootConnection = (state, props) => state.rootConnection;
const getActiveRootConnection = (state, props) => state.activeRootConnection;

//connections graph
const getNodeProps = (node) => {
	return {
		id: UuidUtils.extract(node.id),
		label: node.abbrName,
		size: node.isRoot ? 40 : 20,
		shape: "circularImage",
		image: node.img || CONFIG.PLACEHOLDER_IMG
	};
};
export const getGraphNodes = () => {
	return createSelector(
		[ getConnections, getRootConnection],
		(connections, rootConnection) => {
			let graphNodes = [];
			const rootIds = Object.keys(connections);
			rootConnection = {...rootConnection, isRoot: true};
			rootIds.forEach(rootId=> {
				let conns = connections[rootId]
					.map(c => ({
						...c.person,
						isRoot: rootIds.indexOf(UuidUtils.extract(c.person.id)) > -1
					}))
					.map(getNodeProps);
				graphNodes.push(...conns, getNodeProps(rootConnection));
			});
			return [...graphNodes];
		}
	);
};

const getEdges = (node, rootId) => ({
	from: rootId,
	to: UuidUtils.extract(node.id),
	length: 80
});

export const getGraphEdges = () => {
	return createSelector(
		[ getConnections ],
		(connections) => {
			let graphEdges = [];
			const rootIds = Object.keys(connections);
			rootIds.forEach(rootId => {
				let edges = connections[rootId].map(c => getEdges(c.person, rootId));
				graphEdges.push(...edges);
			});
			return [...graphEdges];
		}
	);
};

//connections/subheader
export const getDirectConnectionsNumberForActiveRoot = () => {
	return createSelector(
		[ getConnections, getActiveRootConnection ],
		(connections, activeRootConnection) => {
			if ( !isEmpty(activeRootConnection) && !isEmpty(connections)) {
				let activeRootId = UuidUtils.extract(activeRootConnection.person.id);
				if (connections.hasOwnProperty(activeRootId)) {
					return connections[activeRootId].length;
				}
			}
		}
	);
};

//dd-related-content
export const getRelatedContent = () => {
	return createSelector(
		[ getActiveRootConnection ],
		(activeRootConnection) => {
			console.log('activeRootConnection', activeRootConnection);
			if (!isEmpty(activeRootConnection)) {
				return activeRootConnection.content;
			}
		}
	);
};
