import * as types from './action-types';
import MockApi from '../api/sentences-mock-api';
import {beginAjaxCall, ajaxCallSuccess, ajaxCallError} from './ajax-status-actions';

export function loadSentencesSuccess(sentences) {
    return {
        type: types.LOAD_SENTENCES_SUCCESS,
        sentences: sentences
    };
}

export function loadSentences() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return MockApi.getData().then(data => {
            dispatch(loadSentencesSuccess(data));
            dispatch(ajaxCallSuccess());
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}