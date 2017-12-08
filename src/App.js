import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	HomeContainer,
	HeaderContainer,
	PeopleContainer,
	ConnectionsContainer
} from './containers';
import { Footer } from './components';
import withTracking from './enhancers/withTracking';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<HeaderContainer />
						<Switch>
							<Route exact path="/" component={HomeContainer} />
							<Route
								exact
								path="/people"
								component={PeopleContainer}
							/>
							<Route
								path="/connections/:id"
								component={ConnectionsContainer}
							/>
							<Route component={PeopleContainer} />
						</Switch>
						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default withTracking(App);
