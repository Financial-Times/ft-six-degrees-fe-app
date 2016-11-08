import initialState from '../store/initial-state';
import * as types from '../actions/action-types';

export default function peopleGroupReducer(state = initialState.peopleGroup, action) {

    switch (action.type) {
        case types.PEOPLE_GROUP_CHANGE:
        return action.peopleGroup;

    default:
        return state;
    }

}