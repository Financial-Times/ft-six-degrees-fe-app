import * as types from './action-types';

function getUpdateConnectedPeopleEvent(connectedPeople) {
    return {
        type: types.CONNECTED_PEOPLE_CHAIN_UPDATE,
        connectedPeopleChain: connectedPeople
    };
}

export function update(connectedPeople) {
    return function (dispatch) {
        dispatch(getUpdateConnectedPeopleEvent(connectedPeople));
    }
}