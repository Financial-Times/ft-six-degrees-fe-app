import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = props => (
	<div className="o-grid-container">
		<div className="o-grid-row">
			<div data-o-grid-colspan="12">
				<div className="home-info">
					<p>
						Use Six Degrees to see who you have been reading about,
						discover their connections and unearth the stories that
						link them.
					</p>
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

export default Home;
