export default {
    ajaxCallsInProgress: 0,
    sentences: [],
    loginState: false,
    hint: '1. Select a person from below to discover their associations, based on who they have appeared in the same stories with',
    dateRange: 'day', // day, week, month, year
    peopleRange: 10, // 1, 5, 10, 20
    peopleGroup: 'mentioned in FT articles', //mentioned in FT articles, based on my behaviour
    peopleData: [],
    legend: {
        topLabel: '',
        bottomLabel: '',
        inner: null
    },
    user: null
};