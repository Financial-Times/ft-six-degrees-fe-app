import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home, InfoCard } from '../../components';
import { introText } from '../../config';

class HomeContainer extends Component {
	render() {
		const infoStyle = {
			maxWidth: '400px'
		};
		const { user } = this.props;
		return (
			<div>
				<Home
					text={user.isAuthed ? introText.authed : introText.default}
				/>
				<InfoCard style={infoStyle} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(HomeContainer);
