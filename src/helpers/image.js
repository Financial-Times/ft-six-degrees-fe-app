import { PLACEHOLDER_IMG, IMG_SERVICE_URL } from '../config';
import qs from 'query-string';

const imageDefaultProps = {
	source: 'six-degrees',
	width: 80,
	height: 80
};

export const getImageUrl = (url, config = {}) => {
	if (!url) {
		url = PLACEHOLDER_IMG;
	}
	config = { ...imageDefaultProps, ...config };
	return `${IMG_SERVICE_URL}${url}?${qs.stringify(config)}`;
};
