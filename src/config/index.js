function isDevOrTest() {
	const host = window.location.hostname;
	let devTestUrl = null;
	if (host === 'six-degrees-dev.ft.com') {
		devTestUrl = 'https://ft-six-degrees-be-app-develop.herokuapp.com/api';
	} else if (host === 'six-degrees-test.ft.com') {
		devTestUrl = 'https://ft-six-degrees-be-app-test.herokuapp.com/api';
	} else if (host === 'six-degrees.ft.com') {
		devTestUrl = 'https://ft-six-degrees-be-app-prod.herokuapp.com/api';
	}
	return devTestUrl;
}

export const introText = {
	default:
		'Use Six Degrees to see who has been in the news, discover their connections and unearth the stories that link them.',
	authed:
		'Use Six Degrees to see who you have been reading about, discover their connections and unearth the stories that link them.'
};

export const breakpoints = {
	XS: 240,
	S: 490,
	M: 740,
	L: 980,
	XL: 1220
};

export const segmentId = '030ff5ed-1257-f8f8-46fe-5cd1cf5fce7c';

export const SHARE_TEXT = 'Discover a different way to view the news.';

export const graphOptions = {
	color: {
		teal: '#2095A4',
		grey: '#B8B5AE'
	}
};

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
