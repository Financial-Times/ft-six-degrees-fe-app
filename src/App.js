import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './components';
import {
	HeaderContainer,
	PeopleContainer,
	ConnectionsContainer
} from './containers';
import { getUserData } from './redux/modules/user';
import {
	loadMentionedPeople,
	loadPersonalisedPeople,
	peopleSelectorChange
} from './redux/modules/people';
import { PEOPLE_SELECTOR } from './config';

class App extends Component {
	componentDidMount() {
		const { getUserData, peopleSelectorChange } = this.props;
		getUserData().then(() => {
			if (this.props.user.isAuthed) {
				peopleSelectorChange(PEOPLE_SELECTOR.AUTHED.VAL);
			}
		});
	}
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
					</div>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps, {
	getUserData,
	loadPersonalisedPeople,
	loadMentionedPeople,
	peopleSelectorChange
})(App);
