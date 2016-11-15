import {combineReducers} from 'redux';
import ajaxStatusReducer from './ajax-status-reducer';
import sentencesReducer from './sentences-reducer';

import loginStateReducer from './login-state-reducer';
import userDetailsReducer from './user-details-reducer';
import hintReducer from './hint-reducer';
import legendReducer from './legend-reducer';
import dateRangeReducer from './date-range-reducer';
import peopleGroupReducer from './people-group-reducer';
import peopleRangeReducer from './people-range-reducer';
import peopleDataReducer from './people-data-reducer';

const rootReducer = combineReducers({
    loginState: loginStateReducer,
    user: userDetailsReducer,
    hint: hintReducer,
    legend: legendReducer,
    dateRange: dateRangeReducer,
    peopleGroup: peopleGroupReducer,
    peopleRange: peopleRangeReducer,
    peopleData: peopleDataReducer,
    sentences: sentencesReducer,
    ajaxCallsInProgress: ajaxStatusReducer
});

export default rootReducer;