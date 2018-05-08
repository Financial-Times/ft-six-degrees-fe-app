import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PEOPLE_SELECTOR } from '../../config';
import { peopleSelectorChange } from '../../redux/modules/people';
import { Header, RestartIcon } from '../../components';

const showLeftIcon = pathname => {
	if (pathname.indexOf('/connections') !== -1) {
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
		const { peopleSelectorChange } = this.props;
		peopleSelectorChange(PEOPLE_SELECTOR.DEFAULT.VAL);
	}
	shareClickHandler() {
		this.setState(() => ({ showShare: !this.state.showShare }));
	}
	render() {
		return (
			<div>
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

export default withRouter(
	connect(null, {
		peopleSelectorChange
	})(HeaderContainer)
);
