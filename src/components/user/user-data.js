import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';
import Cookies from 'services/cookies.utils.js';
import {CONFIG} from 'config-constants';
import * as userActions from 'actions/user-details-actions';

class UserData extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ftSessionCookie = Cookies.read('FTSession');
    }

    isLoggedIn() {
        return typeof this.ftSessionCookie === 'string' && this.ftSessionCookie !== '';
    }

    obtainUsersUuid(cookieData) {
        fetch(CONFIG.URL.API + 'api/session/' + this.ftSessionCookie).then(response => {
            response.json().then(res => {
                const user = Object.assign({}, cookieData, {
                    prefLabel: cookieData.fname + ' ' + cookieData.lname
                }, {
                    uuid: res.uuid
                });

                this.props.actions.update(user);
            });
        });
    }

    obtainUserDetails() {
        const cookieDetails = Cookies.read('FT_User'),
            cookieRows = cookieDetails.split(':'),
            cookieData = {};

        cookieRows.forEach(row => {
            const rowParsed = row.split('=');
            cookieData[rowParsed[0].toLowerCase()] = rowParsed[1];
        });

        this.obtainUsersUuid(cookieData);
    }

    componentDidMount() {
        if (this.isLoggedIn() && !this.props.user) {
            this.obtainUserDetails();
        }
    }

    render() {
        return null;
    }
}

UserData.propTypes = {
    loginState: PropTypes.bool.isRequired,
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loginState: state.loginState,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
