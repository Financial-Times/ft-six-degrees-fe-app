import {CONFIG} from '../config-constants';

export default {
    ajaxCallsInProgress: 0,
    loginState: false,
    hint: CONFIG.TEXT.HINT.SELECT_PERSON,
    dateRange: CONFIG.TEXT.DATE_RANGE.MONTH,
    peopleRangeList: [1, 5, 10, 20],
    peopleRange: 10, // 1, 5, 10, 20
    peopleGroup: CONFIG.TEXT.PEOPLE_GROUP.MENTIONED,
    connectedPeopleChain: {},
    rootConnection: {},
    connectionsRoot: {},
    activeRootConnection: {},
    mentionedPeopleData: [],
    personalisedPeopleData: [],
    relatedContentSingle: [],
    legend: {
        topLabel: '',
        bottomLabel: '',
        inner: null
    },
    user: null
};
