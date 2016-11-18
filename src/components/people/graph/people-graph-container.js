import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CONFIG} from '../../../config-constants';
import * as peopleDataActions from '../../../actions/people-data-actions';
import * as hintActions from '../../../actions/hint-actions';
import Graph from './people-graph';
import PeopleDataUtils from '../../../services/people-data.utils';
import PeopleGraphDataLoader from './people-graph-data-loader';

import './people-graph-container.css';

class PeopleGraphContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.nodeClickCallback = this.nodeClickCallback.bind(this);
     }

    addUser(data) {
        const maxArticles = data && data.length ? parseInt(data[0].articles, 10) : 0,
            user = Object.assign({}, this.props.user, {
            abbrName: PeopleDataUtils.getAbbreviatedName(this.props.user.prefLabel),
            initials: PeopleDataUtils.getNameInitials(this.props.user.prefLabel),
            articles: maxArticles + Math.ceil(maxArticles * 0.25),
            user: true
        });
        data.unshift(user);
        return data;
    }

    removeUser(data) {
        if (data && data.length && data[0].user) {
            data.shift();
        }
        return data;
    }

    updateData() {
        let data = this.props.peopleData.slice(0, this.props.peopleRange || 1);

        if (this.props.loginState && this.props.user && this.props.peopleGroup === 'based on my behaviour') {
            data = this.addUser(data);
        } else {
            data = this.removeUser(data);
        }

        return data;
    }

    updateGraph() {
        const data = this.updateData();

        this.graph = new Graph(this.nodeClickCallback);
        this.graph.draw(data, this.props.peopleRange);

        if (data && data.length) {
            this.props.actions.hint.change(CONFIG.TEXT.HINT.SELECT_PERSON);
        } else {
            this.props.actions.hint.change(CONFIG.TEXT.HINT.NO_PEOPLE_MENTIONED);
        }
    }

    nodeClickCallback(data) {
        this.props.router.push('/connections');
    }

    checkUser() {
        if (!this.props.loginState || (this.props.loginState && this.props.user)) {
            this.updateGraph();
        } else {
            this.timeout = setTimeout(() => {
                if (this.props.user) {
                    this.updateGraph();
                    clearTimeout(this.timeout);
                }
            }, 1000);
        }
    }

    needFtLogo() {
        return !this.props.loginState && !this.props.peopleData.length ? ' withLogo' : '';
    }

    componentDidUpdate(prevProps) {
        this.checkUser();
    }

    render() {

        return (
            <div className={(() => "people-graph-container" + this.needFtLogo())()}>
                <div className="people-graph-data-loader">
                    <PeopleGraphDataLoader />
                </div>
                <div id="people-graph" className="people-graph"></div>
            </div>
        );
    }
}

PeopleGraphContainer.propTypes = {
    loginState: PropTypes.bool.isRequired,
    peopleGroup: PropTypes.string.isRequired,
    peopleRange: PropTypes.number.isRequired,
    peopleData: PropTypes.array.isRequired,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
    return {
        loginState: state.loginState,
        peopleGroup: state.peopleGroup,
        peopleRange: state.peopleRange,
        peopleData: state.peopleData,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            data: bindActionCreators(peopleDataActions, dispatch),
            hint: bindActionCreators(hintActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleGraphContainer);