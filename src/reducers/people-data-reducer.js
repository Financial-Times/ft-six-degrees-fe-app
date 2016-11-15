import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function peopleDataReducer(state = initialState.peopleData, action) {

    switch (action.type) {
        case types.PEOPLE_DATA_UPDATE:
        return action.peopleData;

    default:
        return state;
    }

}