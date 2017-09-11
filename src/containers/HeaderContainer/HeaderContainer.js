import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PEOPLE_SELECTOR } from '../../config';
import { getUserData } from '../../redux/modules/user';
import { peopleSelectorChange } from '../../redux/modules/people';
import { Header, RestartIcon, Login } from '../../components';

const showLeftIcon = pathname => {
	if (pathname.includes('/connections')) {
		return <RestartIcon />;
	}
	return null;
};

class HeaderContainer extends Component {
	constructor() {
		super();
		this.state = {
			showShare: false
		};
		this.shareClickHandler = this.shareClickHandler.bind(this);
	}
	componentDidMount() {
		const { getUserData, peopleSelectorChange } = this.props;
		getUserData().then(userData => {
			if (userData && userData.payload && userData.payload.uuid) {
				peopleSelectorChange(PEOPLE_SELECTOR.AUTHED.VAL);
			} else {
				peopleSelectorChange(PEOPLE_SELECTOR.DEFAULT.VAL);
			}
		});
	}
	shareClickHandler() {
		this.setState(() => ({ showShare: !this.state.showShare }));
	}
	loginHandler() {
		window.location = `https://accounts.ft.com/login?location=${window.location}`;
	}
	render() {
		return (
			<div>
				<Login
					user={this.props.user}
					onClick={() => this.loginHandler()}
				/>
				<Header
					showShare={this.state.showShare}
					shareClickHandler={this.shareClickHandler}
					showLeftIcon={showLeftIcon}
					location={this.props.location}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default withRouter(
	connect(mapStateToProps, {
		getUserData,
		peopleSelectorChange
	})(HeaderContainer)
);
