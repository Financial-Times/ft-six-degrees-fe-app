import * as types from './action-types';

const updateConnections = (connectedPeople, activeRootId) => ({
	type: types.CONNECTED_PEOPLE_CHAIN_UPDATE,
	activeRootId,
	connectedPeopleChain: connectedPeople
});

export default updateConnections;
