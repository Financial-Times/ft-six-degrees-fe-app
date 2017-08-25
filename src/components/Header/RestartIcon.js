import React from 'react';
import { Link } from 'react-router-dom';

const RestartIcon = () =>
	<Link to="/people" className="six-deg-restart">
		<i className="o-icons-icon o-icons-icon--refresh six-deg-icon" />
		<span className="six-deg-icon-label">Start over</span>
	</Link>;

export default RestartIcon;
