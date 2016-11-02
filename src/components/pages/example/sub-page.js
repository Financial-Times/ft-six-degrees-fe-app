import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sentencesActions from '../../../actions/sentences-actions';

import Loader from '../../common/loader/loader';
import SentencesList from './sentences-list';
import './sub-page.css';

class SubPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    componentDidMount() {
        this.props.actions.loadSentences();
    }

    render() {
        const {sentences, loading} = this.props;

        return (
            <div className="sub-page">
                <h2>Example Subpage</h2>
                 {loading && <Loader />}
                <SentencesList sentences={sentences} />
                <button className="o-buttons" onClick={this.redirectToHomePage}>go back</button>
            </div>
        );
    }
}

SubPage.propTypes = {
    sentences: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        sentences: state.sentences,
        loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(sentencesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPage);