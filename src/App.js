import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
						<Route exact path="/" component={Home} />
						<Route path="/people" component={PeopleContainer} />
						<Route
							path="/connections/:id"
							component={ConnectionsContainer}
						/>
						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
