import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { breakpoints } from '../../config';

const { M } = breakpoints;

const RestartIcon = () => (
	<Link
		data-trackable={'six-deg-restart'}
		to="/people"
		className="six-deg-restart"
	>
		<i className="o-icons-icon o-icons-icon--refresh six-deg-icon" />
		<MediaQuery minWidth={M}>
			<span className="six-deg-icon-label">Start over</span>
		</MediaQuery>
	</Link>
);

export default RestartIcon;
