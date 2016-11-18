const storedSixDegreesApiUrl = window.localStorage && window.localStorage.getItem('six-degrees-api') ? window.localStorage.getItem('six-degrees-api') : null;

export const CONFIG = {
    URL: {
        API: storedSixDegreesApiUrl || 'http://ft-six-degrees-be-app.herokuapp.com/',
    },
    TEXT: {
        DATE_RANGE: {
            DAY: 'day',
            WEEK: 'week',
            MONTH: 'month',
            YEAR: 'year'
        },
        HINT: {
            NO_PEOPLE_MENTIONED: 'No data about people mentioned within given period of time',
            SELECT_PERSON: '1. Select a person from below to discover their associations, based on who they have appeared in the same stories with',
            SELECT_ASSOCIATION: '2. Select one of Hillary Clinton\'s associations to discover their linked stories and other people connected to them'
        },
        PEOPLE_GROUP: {
            MENTIONED: 'mentioned in FT articles',
            BEHAVIOUR: 'based on my behaviour'
        }
    }
};