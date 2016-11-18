import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as peopleDataActions from '../../../actions/people-data-actions';
import * as ajaxStatusActions from '../../../actions/ajax-status-actions';
import PeopleDataAjax from '../../../services/people-data-ajax';
import Loader from '../../common/loader/loader';
import './people-graph-data-loader.css'

class PeopleGraphDataLoader extends React.Component {

    fetch(key) {
        this.props.actions.ajax.beginAjaxCall();
        PeopleDataAjax.fetchMentioned(key).then(people => {
            this.props.actions.data.update(people.mentioned);
            this.props.actions.ajax.ajaxCallSuccess();
        }).catch(error => {
            this.props.actions.ajax.ajaxCallError();
        });
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
    dateRange: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        dateRange: state.dateRange
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

