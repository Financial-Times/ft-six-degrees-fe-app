import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Cookies from '../assets/js/services/cookies.utils.js';
import Header from './common/header/header';
import Footer from './common/footer/footer';
import SubHeader from './common/subheader/subheader';
import Hint from './common/hint/hint';
import Share from './common/share/share';
import Legend from './common/legend/legend';
import initialState from '../store/initial-state';
import * as loginStateActions from '../actions/login-state-actions';
import * as peopleGroupActions from '../actions/people-group-actions';
import '../assets/css/font-awesome.min.css';
import './layout.css';

class Layout extends Component {

    componentDidMount() {
        const ftSessionCookie = Cookies.read('FTSession'),
            loggedIn = typeof ftSessionCookie === 'string' && ftSessionCookie !== '';

        this.props.actions.loginActions.loginStateUpdate(loggedIn);

        if (!loggedIn) {
            this.props.actions.peopleGroupActions.change(initialState.peopleGroup);
        } else {
            console.warn('get user details');
        }
    }

    render() {
         return (
            <div className="layout-wrapper">
                <Header location={this.props.location.pathname} />
                <div className="o-grid-container">
                    <div className="o-grid-row">
                        <div data-o-grid-colspan="12">
                            <SubHeader location={this.props.location.pathname} />
                        </div>
                    </div>
                </div>
                <div className="o-grid-container">
                    <div className="o-grid-row">
                        <div data-o-grid-colspan="12">
                            <Hint location={this.props.location.pathname} />
                        </div>
                    </div>
                </div>
                <div className="o-grid-container main-container">
                    {this.props.children}
                    <aside className="aside">
                        <Share />
                        <Legend location={this.props.location.pathname} />
                    </aside>
                </div>
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired,
    loginState: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        loginState: state.loginState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loginActions: bindActionCreators(loginStateActions, dispatch),
            peopleGroupActions: bindActionCreators(peopleGroupActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);