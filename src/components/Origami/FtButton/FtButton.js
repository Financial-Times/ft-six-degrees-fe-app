import React from 'react';
import PropTypes from 'prop-types';
import './FtButton.css';

const FtButton = ({ className, selected, label, onClick, ...props }) => {
	const btnClassName = 'ft-button o-buttons ' + className;

	return (
		<button
			{...props}
			className={btnClassName}
			aria-selected={selected}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

FtButton.propTypes = {
	className: PropTypes.string,
	selected: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default FtButton;
