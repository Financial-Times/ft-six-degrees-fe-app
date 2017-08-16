import React from 'react';
import PropTypes from 'prop-types';
import UuidUtils from 'services/uuid.utils';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import * as connectionsActions from 'actions/dd-connections-actions';
import * as hintActions from 'actions/hint-actions';
import { setRootConnection } from 'actions/dd-root-connection-actions';
import { setActiveRootConnection } from 'actions/dd-active-root-connection-actions';
import { loadPeople } from 'actions/people-data-actions';
import { resetConnections } from 'actions/dd-connections-actions';
import RelatedContent from 'components/dd-related-content/related-content';
import Loader from 'components/common/loader/loader';
import Graph from 'react-graph-vis';
import './connections-graph-container.css';
import { getGraphNodes, getGraphEdges } from 'selectors';
import graphOptions from './graph-options';

class ConnectionsGraphContainer extends React.Component {

	constructor() {
		super();
		this.setNetworkInstance = this.setNetworkInstance.bind(this);
	}

	graphEvents() {
		const { loadConnections, setActiveRootConnection } = this.props;
		return {
			select: (event) => {
				let { nodes, edges } = event;
				console.log("Selected nodes:");
				console.log(nodes);
				console.log("Selected edges:");
				console.log(edges);
				let rootId = nodes[0];
				console.log('rootId', rootId);
				loadConnections(UuidUtils.extract(rootId))
					.then(res => res && setActiveRootConnection(rootId));
			}
		};
	}

	loadData() {
		let {
			loadConnections,
			setRootConnection,
			loadPeople,
			setActiveRootConnection,
			routeParams
		} = this.props;
		loadPeople()
			.then(() => loadConnections(routeParams.id))
			.then(res => setRootConnection(routeParams.id))
			.then(res => setActiveRootConnection(routeParams.id));
	}

	componentDidMount() {
		this.loadData();
	}

	shouldComponentUpdate(nextProps) {
		return !isEmpty(nextProps.connectedPeopleChain)
			&& !isEmpty(nextProps.activeRootConnection)
			&& nextProps.activeRootConnection !== this.props.activeRootConnection;
	}

	setNetworkInstance(nw) {
		this.network = nw;
	}

	componentDidUpdate() {
		const nw = this.network;
		nw.fit();
		nw.stabilize(300);
		nw.on('stabilizationProgress', params => {
			if (params.iterations > params.total - 10) {
				nw.stopSimulation();
			}
		});
	}

	componentWillUnmount() {
		this.props.resetConnections();
		this.props.setActiveRootConnection(null);
		this.props.setRootConnection(null);
	}

	getGraph() {
		return {
			nodes: this.props.graphNodes,
			edges: this.props.graphEdges
		};
	}

	render() {
		let style = {
			width: '100%',
			height: '100%',
			autoSize: true
		};


		if(!Object.keys(this.props.connectedPeopleChain).length) {
			return <Loader />;
		}

		return (
			<div>
				<div className="connections-graph-container">
					<Graph
						style={style}
						graph={this.getGraph()}
						options={graphOptions}
						events={this.graphEvents()}
						getNetwork={this.setNetworkInstance} />
				</div>
				<RelatedContent />
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
	return (state, ownProps) => ({
		graphNodes: graphNodes(state),
		graphEdges: graphEdges(state),
		connectedPeopleChain: state.connectedPeopleChain,
		connectionsRoot: state.connectionsRoot,
		mentionedPeopleData: state.mentionedPeopleData,
		personalisedPeopleData: state.personalisedPeopleData,
		activeRootConnection: state.activeRootConnection,
		loginState: state.loginState
	});
};

export default connect(
	makeMapStateToProps,
	{
		loadConnections: connectionsActions.loadConnections,
		setActiveRootConnection,
		loadPeople,
		resetConnections,
		setRootConnection,
		hint: hintActions
	}
)(ConnectionsGraphContainer);
