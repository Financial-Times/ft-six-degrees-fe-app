import React from 'react';
import { string, bool, number, oneOf } from 'prop-types';
import qs from 'query-string';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import { PLACEHOLDER_IMG, IMG_SERVICE_URL } from '../../../config';

const Image = props => {
	let userOptions = omitBy(omit(props, ['src', 'alt', 'bw']), p => !p);
	if (props.bw) {
		userOptions = { ...userOptions, tint: '#777' };
	}

	const src =
		IMG_SERVICE_URL +
		encodeURIComponent(props.src || PLACEHOLDER_IMG) +
		'?' +
		qs.stringify(userOptions);

	return <img alt={props.alt} src={src} />;
};

Image.propTypes = {
	src: string,
	source: string.isRequired,
	alt: string.isRequired,
	width: number,
	height: number,
	gravity: oneOf(['faces', 'poi']),
	format: oneOf(['jpg', 'png', 'gif', 'svg']),
	fit: oneOf(['cover', 'contain', 'scale-down']),
	quality: oneOf(['lowest', 'low', 'medium', 'high', 'highest', 'lossles']),
	bw: bool
};

export default Image;
