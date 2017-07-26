import initialState from '../store/initial-state';
import * as types from '../actions/action-types';
import isEmpty from 'lodash/isEmpty';

export default function connectedPeopleChainReducer(state = initialState.connectedPeopleChain, action) {

    switch (action.type) {
	    case types.RESET_CONNECTIONS:
	    	return {};
        case types.CONNECTED_PEOPLE_CHAIN_UPDATE:
            return action.connectedPeopleChain;
	    case types.CONNECTIONS_SUCCESS:
	    	return {
			    ...state,
			    [action.meta]: isEmpty(action.payload) ? [] : action.payload
		    };
		default:
			return state;
    }
}
