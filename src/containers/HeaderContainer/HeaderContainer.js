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
	componentDidMount() {
		const { getUserData, peopleSelectorChange } = this.props;
		getUserData().then(userData => {
			if (userData && userData.payload && userData.payload.uuid) {
				peopleSelectorChange(PEOPLE_SELECTOR.AUTHED.VAL);
			}
		});
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
				<Header showLeftIcon={showLeftIcon} {...this.props} />
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
