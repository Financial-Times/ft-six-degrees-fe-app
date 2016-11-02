import {combineReducers} from 'redux';
import ajaxStatusReducer from './ajax-status-reducer';
import sentencesReducer from './sentences-reducer';

const rootReducer = combineReducers({
    sentences: sentencesReducer,
    ajaxCallsInProgress: ajaxStatusReducer
});

export default rootReducer;