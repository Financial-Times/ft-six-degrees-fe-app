import React, { Component } from 'react';
import Graph from 'react-graph-vis';
import isEmpty from 'lodash/isEmpty';
import graphOptions from './graphOptions';
import { extractId } from '../../helpers/uuid';
import './ConnectionsGraph.css';

class ConnectionsGraph extends Component {
	constructor() {
		super();
		this.setNetworkInstance = this.setNetworkInstance.bind(this);
	}

	setNetworkInstance(nw) {
		this.network = nw;
	}

	graphEvents() {
		const { loadConnections, setActiveRootConnection } = this.props;
		return {
			select: event => {
				let { nodes, edges } = event;
				console.log('Selected nodes:');
				console.log(nodes);
				console.log('Selected edges:');
				console.log(edges);
				let rootId = nodes[0];
				console.log('rootId', rootId);
				loadConnections(extractId(rootId)).then(
					res => res && setActiveRootConnection(rootId)
				);
			}
		};
	}

	getGraph() {
		return {
			nodes: this.props.graphNodes,
			edges: this.props.graphEdges
		};
	}

	componentWillUnmount() {
		this.props.resetConnections();
	}

	shouldComponentUpdate(nextProps) {
		return !isEmpty(nextProps.connectionsChain)
			&& !isEmpty(nextProps.activeRootConnection)
			&& nextProps.activeRootConnection !== this.props.activeRootConnection;
	}

	componentDidUpdate() {
		const nw = this.network;
		nw.fit();
		// setTimeout(() => nw.stopSimulation(), 5000);
		nw.on('stabilizationProgress', params => {
			console.log(params);
			if (params.iterations > params.total - 50) {
				nw.stopSimulation();
			}
		});
	}

	render() {
		let style = {
			width: '100%',
			height: '100%',
			autoSize: true
		};
		const { loading } = this.props;

		return (
			<div>
				<div className="connections-graph">
					{loading
						? <div>Loading...</div>
						: <Graph
								style={style}
								graph={this.getGraph()}
								options={graphOptions}
								events={this.graphEvents()}
								getNetwork={this.setNetworkInstance}
							/>}
				</div>
			</div>
		);
	}
}

export default ConnectionsGraph;
