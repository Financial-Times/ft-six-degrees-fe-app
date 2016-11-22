import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import './hint.css';

class Hint extends React.Component {
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
    connectionsRoot: PropTypes.object
}

function mapStateToProps(state, ownProps) {
    return {
        hint: state.hint,
        connectionsRoot: state.connectionsRoot
    };
}

export default connect(mapStateToProps)(Hint);