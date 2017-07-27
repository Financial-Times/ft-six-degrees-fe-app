import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginStateActions from 'actions/login-state-actions';
import './people-subheader-login-area.css';
import FtButton from 'components/common/origami/ft-button';

const accountsAddress = 'http://accounts.ft.com/',
    locationAddress = encodeURIComponent(window.location.href);

class PeopleSubheaderLoginArea extends React.Component {

    login() {
        window.location.assign(accountsAddress + 'login?location=' + locationAddress);
    }

    logout() {
        window.location.assign(accountsAddress + 'logout?location=' + locationAddress);
    }

    render() {
        return (
            <div className="people-subheader-login-area">
            {this.props.loginState ? <FtButton onClick={this.logout} label="Logout" className="o-buttons--standout o-buttons--big" /> :
                <section>
                    <span className="people-subheader-item-label">For a personalised Six Degrees</span>
                    <FtButton onClick={this.login} label="Login" className="o-buttons--standout o-buttons--big" />
                </section>
            }
            </div>
        );
    }
}

PeopleSubheaderLoginArea.propTypes = {
    loginState: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loginState: state.loginState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginStateActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSubheaderLoginArea);
