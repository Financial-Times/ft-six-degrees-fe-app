import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home } from '../../components';
import { introText } from '../../config';

class HomeContainer extends Component {
	render() {
		const { user } = this.props;
		return (
			<Home text={user.isAuthed ? introText.authed : introText.default} />
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(HomeContainer);
