import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function connectedPeopleChainReducer(state = initialState.connectedPeopleChain, action) {

    switch (action.type) {
        case types.CONNECTED_PEOPLE_CHAIN_UPDATE:
            return action.connectedPeopleChain;
		default:
			return state;
    }

}
