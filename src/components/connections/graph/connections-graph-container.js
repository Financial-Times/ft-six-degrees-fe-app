import React, { PropTypes } from 'react';
import UuidUtils from '../../../services/uuid.utils';
import { connect } from 'react-redux';
import * as connectionsActions from '../../../actions/dd-connections-actions';
import * as hintActions from '../../../actions/hint-actions';
import { setRootConnection } from '../../../actions/dd-root-connection-actions';
import { setActiveRootConnection } from '../../../actions/dd-active-root-connection-actions';
import Graph from 'react-graph-vis';
import './connections-graph-container.css';
import { getGraphNodes, getGraphEdges } from '../../../selectors';
import graphOptions from './graph-options';

class ConnectionsGraphContainer extends React.Component {

	graphEvents() {
		const { loadConnections } = this.props;
		return {
			select: (event) => {
				let { nodes, edges } = event;
				console.log("Selected nodes:");
				console.log(nodes);
				console.log("Selected edges:");
				console.log(edges);
				let rootId = nodes[0];
				console.log('rootId', rootId);
				loadConnections(UuidUtils.extract(rootId));
			}
		};
	}

	loadData() {
		let {
			loadConnections,
			setRootConnection,
			routeParams
		} = this.props;
		loadConnections(routeParams.id);
		setRootConnection(routeParams.id);
	}

	componentDidMount() {
		this.loadData();
	}


	render() {
		let style = {
			width: '100%',
			height: '600px'
		};

		if(!Object.keys(this.props.connectedPeopleChain).length) {
			return <div>Loadin...</div>;
		}

		const graph = {
			nodes: this.props.graphNodes,
			edges: this.props.graphEdges
		};

		return (
			<div className="connections-graph-container">
				<div id="connections-graph" className="connections-graph">
					<Graph style={style} graph={graph} options={graphOptions} events={this.graphEvents()} />
				</div>
			</div>
		);
	}
}

ConnectionsGraphContainer.propTypes = {
	connectedPeopleChain: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	personalisedPeopleData: PropTypes.array.isRequired,
	connectionsRoot: PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired
};

const makeMapStateToProps = (state, ownProps) => {
	const graphNodes = getGraphNodes();
	const graphEdges = getGraphEdges();
	const mapStateToProps = (state, ownProps) => ({
		graphNodes: graphNodes(state, ownProps),
		graphEdges: graphEdges(state, ownProps),
		connectedPeopleChain: state.connectedPeopleChain,
		connectionsRoot: state.connectionsRoot,
		mentionedPeopleData: state.mentionedPeopleData,
		activeRootConnection: state.activeRootConnection,
		loginState: state.loginState,
		personalisedPeopleData: state.personalisedPeopleData
	});
	return mapStateToProps;
};

export default connect(
	makeMapStateToProps,
	{
		loadConnections: connectionsActions.loadConnections,
		setActiveRootConnection,
		setRootConnection,
		hint: hintActions
	}
)(ConnectionsGraphContainer);
