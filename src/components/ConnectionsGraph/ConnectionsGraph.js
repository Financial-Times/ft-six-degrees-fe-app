import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from 'react-graph-vis';
import graphOptions from './graphOptions';
import './ConnectionsGraph.css';

class ConnectionsGraph extends Component {
	constructor() {
		super();
		this.setNetworkInstance = this.setNetworkInstance.bind(this);
	}

	setNetworkInstance(nw) {
		this.network = nw;
	}

	componentDidUpdate() {
		const nw = this.network;
		nw.fit();
		clearTimeout(this.time);
		this.time = setTimeout(() => {
			nw.stopSimulation();
		}, 5000);
	}

	render() {
		let style = {
			width: '100%',
			height: '100%',
			autoSize: true
		};
		const { loading, graph, onNodeClick } = this.props;

		return (
			<div>
				<div className="connections-graph">
					{loading
						? <div>Loading...</div>
						: <Graph
								style={style}
								graph={graph}
								options={graphOptions}
								events={onNodeClick}
								getNetwork={this.setNetworkInstance}
							/>}
				</div>
			</div>
		);
	}
}

ConnectionsGraph.PropTypes = {
	loading: PropTypes.bool.isRequired,
	graph: PropTypes.shape({
		nodes: PropTypes.arrayOf(PropTypes.object),
		edges: PropTypes.arrayOf(PropTypes.object)
	}).isRequired,
	onNodeClick: PropTypes.func.isRequired
};

export default ConnectionsGraph;
