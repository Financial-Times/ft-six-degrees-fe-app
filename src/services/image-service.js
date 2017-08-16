import { CONFIG } from '../config-constants';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';

const imageDefaultProps = {
	source: 'six-degrees',
	width: 80,
	height: 80
};

export const getQueryString = (url) => qs.extract(url);

export const getImageUrl = (url, config = {}) => {
	if (!url) {
		url = CONFIG.PLACEHOLDER_IMG;
	}
	config = { ...imageDefaultProps, ...config };
	return `${CONFIG.IMG_SERVICE_URL}${url}?${qs.stringify(config)}`;
};


const ImageService = () => {

};

export default ImageService;

