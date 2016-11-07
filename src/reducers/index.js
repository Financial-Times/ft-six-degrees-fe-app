import {combineReducers} from 'redux';
import ajaxStatusReducer from './ajax-status-reducer';
import sentencesReducer from './sentences-reducer';

import hintReducer from './hint-reducer';
import legendReducer from './legend-reducer';

const rootReducer = combineReducers({
    hint: hintReducer,
    legend: legendReducer,
    sentences: sentencesReducer,
    ajaxCallsInProgress: ajaxStatusReducer
});

export default rootReducer;