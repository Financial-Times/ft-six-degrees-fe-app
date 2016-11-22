import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CONFIG} from '../../../config-constants';
import * as connectedPeopleChainActions from '../../../actions/connected-people-chain-actions';
import * as connectionsRootActions from '../../../actions/connections-root-actions';
import * as hintActions from '../../../actions/hint-actions';
import './connections-graph-container.css';

class ConnectionsGraphContainer extends React.Component {

    updateHint(name) {
        this.props.actions.hint.change(CONFIG.TEXT.HINT.SELECT_ASSOCIATION.replace('####', name));
    }

    updateConnectionsRootPerson(uuid, peopleData) {
        const person = peopleData.filter(person => {
            return person.id.indexOf(uuid) !== -1;
        })[0];

        this.props.actions.connectionsRoot.change(person);
        this.props.actions.connectedPeopleChain.update([person]);
        this.updateHint(person.abbrName);
    }

    componentDidUpdate() {
        const peopleData = [].concat(this.props.personalisedPeopleData, this.props.mentionedPeopleData);

        if (!this.props.connectionsRoot.id && peopleData.length) {
            this.updateConnectionsRootPerson(this.props.router.params.id, peopleData);
        } else {
            this.updateHint(this.props.connectionsRoot.abbrName);
        }
    }

    componentDidMount() {
        this.props.actions.connectionsRoot.change({});
    }

    render() {
        return (
            <div className="connections-graph-container">
                Connections graph - {this.props.connectionsRoot.abbrName} as a starting point
            </div>
        );
    }
}

ConnectionsGraphContainer.propTypes = {
    connectedPeopleChain: PropTypes.array.isRequired,
    connectionsRoot: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        connectedPeopleChain: state.connectedPeopleChain,
        connectionsRoot: state.connectionsRoot,
        mentionedPeopleData: state.mentionedPeopleData,
        personalisedPeopleData: state.personalisedPeopleData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            connectedPeopleChain: bindActionCreators(connectedPeopleChainActions, dispatch),
            connectionsRoot: bindActionCreators(connectionsRootActions, dispatch),
            hint: bindActionCreators(hintActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsGraphContainer);
