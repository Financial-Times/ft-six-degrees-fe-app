import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import flattenDeep from 'lodash/flattenDeep';
import isArray from 'lodash/isArray';
import min from 'lodash/min';
import { Loader } from '../../components/Origami';
import { getLastName } from '../../helpers/connection';
import { extractId } from '../../helpers/uuid';
import { breakpoints } from '../../config';
import {
	loadConnections,
	setRootConnection,
	getGraphEdges,
	getGraphNodes,
	resetConnections,
	getRelatedContent,
	setActiveRootConnection
} from '../../redux/modules/connections';
import { ConnectionsMobileViewContainer } from '../';
import { loadPeople } from '../../redux/modules/people';
import { PageTitle, ConnectionsGraph, RelatedContent } from '../../components';

const { L } = breakpoints;

class ConnectionsContainer extends Component {
	constructor() {
		super();
		this.getGraph = this.getGraph.bind(this);
		this.onNodeClick = this.onNodeClick.bind(this);
		this.getTitleText = this.getTitleText.bind(this);
		this.getGraph = this.getGraph.bind(this);
		this.onNodeClick = this.onNodeClick.bind(this);
		this.getTabsData = this.getTabsData.bind(this);
		this.scrollToContent = this.scrollToContent.bind(this);
		this.getDegree = this.getDegree.bind(this);
		this.getParents = this.getParents.bind(this);
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
				let { nodes } = event;
				let rootId = nodes[0];
				if (rootId) {
					this.props
						.loadConnections(extractId(rootId))
						.then(
							res =>
								res &&
								this.props.setActiveRootConnection(rootId)
						);
				}
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
			!isEqual(
				activeRootConnection,
				this.props.connections.activeRootConnection
			)
		);
	}
	getParents = (id, connections) => {
		let parents = [];
		Object.keys(connections).forEach(parentId => {
			connections[parentId].forEach(({ person }) => {
				if (extractId(person.id) === id) {
					parents.push(parentId);
				}
			});
		});
		let children = [];
		if (connections.hasOwnProperty(id)) {
			children = connections[id].map(({ person }) =>
				extractId(person.id)
			);
		}
		return [...parents, ...children];
	};
	getDegree(id, rootId, connections, degree = 1) {
		let nodes = this.getParents(id, connections);
		let newNodes = flattenDeep(nodes);
		if (newNodes.indexOf(rootId) > -1) {
			return degree;
		}
		const newConnections = { ...connections, [id]: [] };
		return newNodes.map(p => {
			return this.getDegree(p, rootId, newConnections, degree + 1);
		});
	}

	getTitleText() {
		const rootConnectionPerson = this.props.connections.rootConnection
			.person;
		const activeRootConnectionPerson = this.props.connections
			.activeRootConnection.person;
		let titleText = '';
		if (
			!isEmpty(rootConnectionPerson) &&
			!isEmpty(activeRootConnectionPerson)
		) {
			if (rootConnectionPerson.id === activeRootConnectionPerson.id) {
				titleText = `${rootConnectionPerson.abbrName}'s connections`;
			} else {
				let degree = this.getDegree(
					extractId(activeRootConnectionPerson.id),
					extractId(rootConnectionPerson.id),
					this.props.connections.connectionsChain
				);
				if (isArray(degree)) {
					degree = flattenDeep(degree);
					degree = min(degree);
				}

				const degreeForm = degree > 1 ? 'degrees' : 'degree';
				titleText = `${rootConnectionPerson.abbrName} is ${degree} ${degreeForm} of separation away from ${activeRootConnectionPerson.abbrName}`;
			}
		}
		return titleText;
	}

	getTabsData(content) {
		if (!isEmpty(content)) {
			const rootIds = Object.keys(content);
			return rootIds.reduce((agg, rootId, idx) => {
				let item = {};
				item['id'] = rootId;
				item['articles'] = content[rootId].content;
				item['label'] =
					idx > 0
						? `${getLastName(
								content[rootIds[idx - 1]]
							)} & ${getLastName(content[rootId])}`
						: getLastName(content[rootId]);
				item['title'] =
					idx > 0
						? `${getLastName(
								content[rootIds[idx - 1]]
							)} appears in ${content[rootId].content
								.length} articles with ${getLastName(
								content[rootId]
							)}`
						: `${getLastName(content[rootId])} appears in ${content[
								rootId
							].content.length} articles`;
				return [...agg, item];
			}, []);
		}
	}

	componentDidMount() {
		this.loadData();
	}

	componentWillUnmount() {
		this.props.resetConnections();
	}

	scrollToContent() {
		const contentEl = ReactDOM.findDOMNode(this.content);
		const y = parseInt(contentEl.offsetTop, 10);
		if (contentEl) {
			setTimeout(() => window.scrollTo(0, y), 1);
		}
	}

	render() {
		let tabsData = [];
		if (this.props.relatedContent) {
			tabsData = this.getTabsData(this.props.relatedContent);
		}
		const graph = this.getGraph();
		const nodeClickHandler = this.onNodeClick();
		const titleText = this.getTitleText();

		const loading =
			Object.keys(this.props.relatedContent).length === 0 &&
			this.props.graphNodes.length === 0;

		return loading ? (
			<Loader />
		) : (
			<MediaQuery minWidth={L}>
				{matches => {
					return matches ? (
						<div>
							<PageTitle>
								{this.getTitleText()}
								<span className="go-to-content">
									&nbsp; (<a
										href={'#content'}
										onClick={this.scrollToContent}
									>
										view stories
									</a>)
								</span>
							</PageTitle>
							<ConnectionsGraph
								loading={this.props.connections.isFetching}
								graph={graph}
								onNodeClick={nodeClickHandler}
							/>
							<RelatedContent
								ref={content => (this.content = content)}
								tabsData={tabsData}
							/>
						</div>
					) : (
						<ConnectionsMobileViewContainer
							loading={this.props.connections.isFetching}
							tabsData={tabsData}
							titleText={titleText}
							graph={graph}
							onNodeClick={nodeClickHandler}
						/>
					);
				}}
			</MediaQuery>
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
