function isDevOrTest() {
	const href = window.location.href;
	let devTestUrl = null;
	if (href.indexOf('six-degrees-dev.ft.com') !== -1) {
		devTestUrl = 'https://ft-six-degrees-be-app-develop.herokuapp.com/api';
	} else if (href.indexOf('six-degrees-test.ft.com') !== -1) {
		devTestUrl = 'https://ft-six-degrees-be-app-staging.herokuapp.com/api';
	}
	return devTestUrl;
}

export const API_ROOT = isDevOrTest() || 'http://localhost:8080/api';
export const IMG_SERVICE_URL =
	'https://www.ft.com/__origami/service/image/v2/images/raw/';
export const PLACEHOLDER_IMG =
	'https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif';
export const PEOPLE_SELECTOR = {
	DEFAULT: {
		VAL: 'mentioned',
		LABEL: 'in stories on FT.com'
	},
	AUTHED: {
		VAL: 'personalised',
		LABEL: 'in stories I have read'
	}
};
export const PEOPLE_DATE_RANGE = ['7 days', '14 days', 'month', '6 months'];
