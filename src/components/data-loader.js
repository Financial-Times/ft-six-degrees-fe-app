import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as peopleDataActions from '../actions/people-data-actions';
import ConnectionsDataAjax from '../services/connections-data-ajax';
import PeopleDataAjax from '../services/people-data-ajax';
import PeoplePersonalisedDataAjax from '../services/people-personalised-data-ajax';
import Loader from './common/loader/loader';
import './data-loader.css'

class DataLoader extends React.Component {

    fetchConnections() {
        const uuid = this.props.router.params.id,
            location = this.props.router.location.pathname;

        if (location.indexOf('connections') !== -1 && uuid) {
            ConnectionsDataAjax.fetch(uuid, 'month').then(connections => {
                console.log('connections response', connections);
            });
        }
    }

    fetchMentioned(key) {
        PeopleDataAjax.fetchMentioned(key).then(people => {
            this.props.actions.data.updateMentioned(people.people);
        }).catch(error => {
            console.error('[data-loader] Fetch mentioned error', error);
        });
    }

    fetchPersonalised(key) {
        if (this.props.user) {
            PeoplePersonalisedDataAjax.fetch(key, this.props.user.uuid).then(people => {
                this.props.actions.data.updatePersonalised(people);
            }).catch(error => {
                console.error('[data-loader] Fetch personalised error', error);
            });
        }
    }

    fetch(key) {
        this.fetchMentioned(key);

        if (this.props.loginState) {
            this.fetchPersonalised(key);
        }
    }

    componentDidUpdate() {
        this.fetch(this.props.dateRange);
        this.fetchConnections();
    }

    componentDidMount() {
        this.fetch();
        this.fetchConnections();
    }

    render() {
        return <Loader />;
    }
}

DataLoader.propTypes = {
    dateRange: PropTypes.string.isRequired,
    loginState: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object
}

function mapStateToProps(state, ownProps) {
    return {
        dateRange: state.dateRange,
        loginState: state.loginState,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            data: bindActionCreators(peopleDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataLoader);

