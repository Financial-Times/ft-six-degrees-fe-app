import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CONFIG} from '../../../config-constants';
import * as connectedPeopleChainActions from '../../../actions/connected-people-chain-actions';
import * as connectionsRootActions from '../../../actions/connections-root-actions';
import * as hintActions from '../../../actions/hint-actions';
import './connections-graph-container.css';

class ConnectionsGraphContainer extends React.Component {

    updateConnectionsRootPerson(uuid) {
        const peopleData = [].concat(this.props.personalisedPeopleData, this.props.mentionedPeopleData);

        if (peopleData.length) {
            const person = peopleData.filter(person => {
                return person.id.indexOf(uuid) !== -1;
            })[0];

            this.props.actions.connectionsRoot.change(person);
            this.props.actions.hint.change(CONFIG.TEXT.HINT.SELECT_ASSOCIATION.replace('####', person.abbrName));
        }
    }

    updateConnectedPeopleChain(uuid) {
        const connectedPeopleChain = [].concat(this.props.connectedPeopleChain);

        uuid = uuid || this.props.router.params.id;

        if (!connectedPeopleChain.length || connectedPeopleChain.indexOf(uuid) !== -1) {
            connectedPeopleChain.push(uuid);
            this.updateConnectionsRootPerson(connectedPeopleChain[0]);
        }
    }

    componentDidUpdate() {
        if (!this.props.connectedPeopleChain.length) {
            this.updateConnectedPeopleChain();
        }
    }

    componentDidMount() {
        this.updateConnectedPeopleChain();
    }

    render() {
        return (
            <div className="connections-graph-container">
                Connections graph
            </div>
        );
    }
}

ConnectionsGraphContainer.propTypes = {
    connectedPeopleChain: PropTypes.array.isRequired,
    connectionsRoot: PropTypes.object,
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
            connectedPeople: bindActionCreators(connectedPeopleChainActions, dispatch),
            connectionsRoot: bindActionCreators(connectionsRootActions, dispatch),
            hint: bindActionCreators(hintActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsGraphContainer);
