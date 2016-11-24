import {combineReducers} from 'redux';
import ajaxStatusReducer from './ajax-status-reducer';

import loginStateReducer from './login-state-reducer';
import userDetailsReducer from './user-details-reducer';
import hintReducer from './hint-reducer';
import legendReducer from './legend-reducer';
import dateRangeReducer from './date-range-reducer';
import peopleGroupReducer from './people-group-reducer';
import peopleRangeReducer from './people-range-reducer';
import personalisedPeopleDataReducer from './people-data-personalised-reducer';
import mentionedPeopleDataReducer from './people-data-mentioned-reducer';
import connectedPeopleChainReducer from './connected-people-chain-reducer';
import connectionsRootReducer from './connections-root-reducer';
import relatedContentSingleReducer from './related-content-single-reducer';

const rootReducer = combineReducers({
    loginState: loginStateReducer,
    user: userDetailsReducer,
    hint: hintReducer,
    legend: legendReducer,
    dateRange: dateRangeReducer,
    peopleGroup: peopleGroupReducer,
    peopleRange: peopleRangeReducer,
    personalisedPeopleData: personalisedPeopleDataReducer,
    mentionedPeopleData: mentionedPeopleDataReducer,
    connectedPeopleChain: connectedPeopleChainReducer,
    connectionsRoot: connectionsRootReducer,
    ajaxCallsInProgress: ajaxStatusReducer,
    relatedContentSingle: relatedContentSingleReducer
});

export default rootReducer;