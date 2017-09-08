import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	HeaderContainer,
	PeopleContainer,
	ConnectionsContainer
} from './containers';
import { Home, Footer } from './components';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<HeaderContainer />
						<Switch>
							<Route exact path="/" component={Home} />
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

export default App;
