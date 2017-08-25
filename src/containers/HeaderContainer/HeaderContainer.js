import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, InfoIcon, RestartIcon } from '../../components';

const showLeftIcon = pathname => {
	if (pathname === '/') {
		return <InfoIcon />;
	}
	if (pathname.includes('/connections')) {
		return <RestartIcon />;
	}
	return null;
};

class HeaderContainer extends Component {
	render() {
		return <Header showLeftIcon={showLeftIcon} {...this.props} />;
	}
}

export default withRouter(connect()(HeaderContainer));
