import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as hintActions from '../../../actions/hint-actions';
import './hint.css';

class Hint extends React.Component {

    determineInitialHint(location) {
        this.props.actions.change(location === '/people' ? '1. Select a person from below to discover their associations, based on who they have appeared in the same stories with' : '2. Select one of [PERSON]\'s associations to discover their linked stories and other people connected to them');
    }

    componentDidMount() {
        this.determineInitialHint(this.props.location);
    }

    render() {
        const {hint} = this.props;

        return (
            <div className="hint">
                {hint}
            </div>
        );
    }
};

Hint.propTypes = {
    hint: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        hint: state.hint
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(hintActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hint);