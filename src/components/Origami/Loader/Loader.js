import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = 'medium', theme = 'dark', style = {} }) => {
	const loaderStyle = {
		marginTop: '30px',
		textAlign: 'center',
		...style
	};
	return (
		<div style={loaderStyle}>
			<div
				className={`o-loading o-loading--${theme} o-loading--${size}`}
			/>
		</div>
	);
};

Loader.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	theme: PropTypes.oneOf(['light', 'dark'])
};

export default Loader;
