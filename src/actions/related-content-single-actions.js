import * as types from './action-types';

function getRelatedContentSingleUpdateEvent(relatedContentSingle) {
    return {
        type: types.RELATED_CONTENT_SINGLE_UPDATE,
        relatedContentSingle: relatedContentSingle
    };
}

export function update(relatedContentSingle) {
    return function (dispatch) {
        dispatch(getRelatedContentSingleUpdateEvent(relatedContentSingle));
    }
}