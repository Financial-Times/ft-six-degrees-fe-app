import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { breakpoints } from '../../config';
import './Home.css';

const { L } = breakpoints;

let homeInfoStyle = {};

const Home = ({ text }) => (
	<MediaQuery maxWidth={L}>
		{matches => {
			if (matches) {
				homeInfoStyle = { marginTop: '50px' };
			}
			return (
				<div className="o-grid-container">
					<div className="o-grid-row">
						<div data-o-grid-colspan="12">
							<div className="home-info" style={homeInfoStyle}>
								<p>{text}</p>
								<Link
									to="/people"
									className="o-buttons o-buttons--standout o-buttons--big"
								>
									Get started
								</Link>
							</div>
						</div>
					</div>
				</div>
			);
		}}
	</MediaQuery>
);

export default Home;
