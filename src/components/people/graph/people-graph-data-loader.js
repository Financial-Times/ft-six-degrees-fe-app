import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as peopleDataActions from '../../../actions/people-data-actions';
import * as ajaxStatusActions from '../../../actions/ajax-status-actions';
import PeopleDataAjax from '../../../services/people-data-ajax';
import PeoplePersonalisedDataAjax from '../../../services/people-personalised-data-ajax';
import Loader from '../../common/loader/loader';
import './people-graph-data-loader.css'

class PeopleGraphDataLoader extends React.Component {

    fetchMentioned(key) {
        PeopleDataAjax.fetchMentioned(key).then(people => {
            this.props.actions.data.updateMentioned(people.people);
            this.props.actions.ajax.ajaxCallSuccess();
        }).catch(error => {
            this.props.actions.ajax.ajaxCallError();
        });
    }

    fetchPersonalised(key) {
        if (this.props.user) {
            PeoplePersonalisedDataAjax.fetch(key, this.props.user.uuid).then(people => {
                this.props.actions.data.updatePersonalised(people);
                this.props.actions.ajax.ajaxCallSuccess();
            }).catch(error => {
                this.props.actions.ajax.ajaxCallError();
            });
        }
    }

    fetch(key) {
        this.props.actions.ajax.beginAjaxCall();

        this.fetchMentioned(key);

        if (this.props.loginState) {
            this.fetchPersonalised(key);
        }
    }

    componentDidUpdate() {
        this.fetch(this.props.dateRange);
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return <Loader />;
    }
}

PeopleGraphDataLoader.propTypes = {
    dateRange: PropTypes.string.isRequired,
    loginState: PropTypes.bool.isRequired,
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
            ajax: bindActionCreators(ajaxStatusActions, dispatch),
            data: bindActionCreators(peopleDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleGraphDataLoader);

