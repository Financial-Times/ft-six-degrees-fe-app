import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home, InfoCard } from '../../components';
import { introText } from '../../config';

class HomeContainer extends Component {
	componentDidMount() {
		document.body.dispatchEvent(
			new CustomEvent('oTracking.page', {
				detail: {},
				bubbles: true
			})
		);
	}
	render() {
		const infoStyle = {
			maxWidth: '400px'
		};
		return (
			<div>
				<Home text={introText.default} />
				<InfoCard style={infoStyle} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(HomeContainer);
