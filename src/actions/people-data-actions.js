import * as types from './action-types';

function getMentionedPeopleDataUpdateEvent(data) {
    return {
        type: types.MENTIONED_PEOPLE_DATA_UPDATE,
        mentionedPeopleData: data
    };
}

function getPersonalisedPeopleDataUpdateEvent(data) {
    return {
        type: types.PERSONALISED_PEOPLE_DATA_UPDATE,
        personalisedPeopleData: data
    };
}

export function updateMentioned(data) {
    return function (dispatch) {
        dispatch(getMentionedPeopleDataUpdateEvent(data));
    }
}

export function updatePersonalised(data) {
    return function (dispatch) {
        dispatch(getPersonalisedPeopleDataUpdateEvent(data));
    }
}