const storedSixDegreesApiUrl = window.localStorage && window.localStorage.getItem('six-degrees-api') ? window.localStorage.getItem('six-degrees-api') : null;

function isDevOrTest() {
    const href = window.location.href;
    let devTestUrl = null;
    if (href.indexOf('six-degrees-dev.ft.com')!== -1) {
        devTestUrl = 'https://ft-six-degrees-be-app-develop.herokuapp.com/';
    } else if (href.indexOf('six-degrees-test.ft.com')!== -1) {
        devTestUrl = 'https://ft-six-degrees-be-app-staging.herokuapp.com/'
    }
    return devTestUrl;
}

export const CONFIG = {
    URL: {
        API: storedSixDegreesApiUrl || isDevOrTest() || 'https://ft-six-degrees-be-app.herokuapp.com/',
    },
    TEXT: {
        DATE_RANGE: {
            DAY: 'day',
            WEEK: 'week',
            MONTH: 'month',
            YEAR: 'year'
        },
        HINT: {
            NO_PEOPLE_MENTIONED: 'No data about people mentioned within given period of time, try a different timescale',
            SELECT_PERSON: '1. Select a person from below to discover their associations, based on who they have appeared in the same stories with',
            SELECT_ASSOCIATION: '2. Select one of Hillary Clinton\'s associations to discover their linked stories and other people connected to them'
        },
        PEOPLE_GROUP: {
            MENTIONED: 'mentioned in FT articles',
            BEHAVIOUR: 'based on my behaviour'
        }
    }
};