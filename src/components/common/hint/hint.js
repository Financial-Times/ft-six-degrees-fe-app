import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CONFIG} from '../../../config-constants';
import * as hintActions from '../../../actions/hint-actions';
import './hint.css';

class Hint extends React.Component {

    getHintText() {
        return this.props.location === '/people' ? CONFIG.TEXT.HINT.SELECT_PERSON : CONFIG.TEXT.HINT.SELECT_ASSOCIATION
    }

    componentDidMount() {
        this.props.actions.change(this.getHintText());
    }

    render() {
        return (
            <div className="hint">
                {this.props.hint}
            </div>
        );
    }
};

Hint.propTypes = {
    hint: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
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