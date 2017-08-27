import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
	loadConnections,
	setRootConnection,
	getGraphEdges,
	getGraphNodes,
	resetConnections,
	setActiveRootConnection
} from '../../redux/modules/connections';
import { loadPeople } from '../../redux/modules/people';
import { PageTitle, ConnectionsGraph } from '../../components';

class ConnectionsContainer extends Component {
	loadData() {
		const {
			loadConnections,
			setRootConnection,
			people,
			history,
			setActiveRootConnection
		} = this.props;

		const { id } = this.props.match.params;

		if (people[`${people.peopleSelector}People`].length > 0) {
			loadConnections(id)
				.then(() => setRootConnection(id))
				.then(() => setActiveRootConnection(id));
		} else {
			history.push('/people');
		}
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { rootConnectionPerson } = this.props.connections.rootConnection;
		const titleText = isEmpty(rootConnectionPerson)
			? ''
			: `${rootConnectionPerson.abbrName}'s connections`;

		return (
			<div>
				<PageTitle>
					{titleText}
				</PageTitle>
				<ConnectionsGraph
					loading={this.props.connections.isFetching}
					connectionsChain={this.props.connections.connectionsChain}
					activeRootConnection={
						this.props.connections.activeRootConnection
					}
					rootConnection={this.props.connections.rootConnection}
					graphNodes={this.props.graphNodes}
					graphEdges={this.props.graphEdges}
					resetConnections={this.props.resetConnections}
					setRootConnection={this.props.setRootConnection}
					setActiveRootConnection={this.props.setActiveRootConnection}
					loadConnections={this.props.loadConnections}
				/>
			</div>
		);
	}
}

const makeMapStateToProps = (state, ownProps) => {
	const graphNodes = getGraphNodes();
	const graphEdges = getGraphEdges();
	return (state, ownProps) => ({
		graphNodes: graphNodes(state.connections),
		graphEdges: graphEdges(state.connections),
		connections: state.connections,
		people: state.people
	});
};

export default withRouter(
	connect(makeMapStateToProps, {
		loadConnections,
		setRootConnection,
		loadPeople,
		resetConnections,
		setActiveRootConnection
	})(ConnectionsContainer)
);
