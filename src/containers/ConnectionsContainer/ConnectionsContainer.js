import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { extractId } from '../../helpers/uuid';
import {
	loadConnections,
	setRootConnection,
	getGraphEdges,
	getGraphNodes,
	resetConnections,
	getRelatedContent,
	setActiveRootConnection
} from '../../redux/modules/connections';
import { loadPeople } from '../../redux/modules/people';
import { PageTitle, ConnectionsGraph, RelatedContent } from '../../components';

class ConnectionsContainer extends Component {
	constructor() {
		super();
		this.getGraph = this.getGraph.bind(this);
		this.onNodeClick = this.onNodeClick.bind(this);
	}
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

	getGraph() {
		return {
			nodes: this.props.graphNodes,
			edges: this.props.graphEdges
		};
	}

	onNodeClick() {
		return {
			select: event => {
				let { nodes, edges } = event;
				console.log('Selected nodes:');
				console.log(nodes);
				console.log('Selected edges:');
				console.log(edges);
				let rootId = nodes[0];
				console.log('rootId', rootId);
				this.props
					.loadConnections(extractId(rootId))
					.then(
						res => res && this.props.setActiveRootConnection(rootId)
					);
			}
		};
	}

	shouldComponentUpdate(nextProps) {
		const {
			connectionsChain,
			activeRootConnection
		} = nextProps.connections;
		return (
			!isEmpty(connectionsChain) &&
			!isEmpty(activeRootConnection) &&
			activeRootConnection !== this.props.connections.activeRootConnection
		);
	}

	getTitleText() {
		const rootConnectionPerson = this.props.connections.rootConnection
			.person;
		const activeRootConnectionPerson = this.props.connections
			.activeRootConnection.person;
		const rootIds = Object.keys(this.props.connections.connectionsChain);
		let titleText = '';
		if (
			!isEmpty(rootConnectionPerson) &&
			!isEmpty(activeRootConnectionPerson)
		) {
			if (rootConnectionPerson.id === activeRootConnectionPerson.id) {
				titleText = `${rootConnectionPerson.abbrName}'s connections`;
			} else {
				const length = rootIds.indexOf(
					extractId(activeRootConnectionPerson.id)
				);
				const degreeForm = length > 1 ? 'degrees' : 'degree';
				titleText = `${rootConnectionPerson.abbrName} is ${length} ${degreeForm} of separation away from ${activeRootConnectionPerson.abbrName}`;
			}
		}
		return titleText;
	}

	componentDidMount() {
		this.loadData();
	}

	componentWillUnmount() {
		this.props.resetConnections();
	}

	render() {
		return (
			<div>
				<PageTitle>
					{this.getTitleText()}
				</PageTitle>
				<ConnectionsGraph
					loading={this.props.connections.isFetching}
					graph={this.getGraph()}
					onNodeClick={this.onNodeClick()}
				/>
				<RelatedContent content={this.props.relatedContent} />
			</div>
		);
	}
}

const makeMapStateToProps = (state, ownProps) => {
	const graphNodes = getGraphNodes();
	const graphEdges = getGraphEdges();
	const relatedContent = getRelatedContent();
	return (state, ownProps) => ({
		graphNodes: graphNodes(state.connections),
		graphEdges: graphEdges(state.connections),
		relatedContent: relatedContent(state.connections),
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
