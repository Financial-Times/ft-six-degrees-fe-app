import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CONFIG} from '../../../config-constants';
import * as connectedPeopleChainActions from '../../../actions/connected-people-chain-actions';
import * as connectionsRootActions from '../../../actions/connections-root-actions';
import * as hintActions from '../../../actions/hint-actions';
import Graph from 'react-graph-vis';
import './connections-graph-container.css';

class ConnectionsGraphContainer extends React.Component {

	constructor(props) {
		super(props);
		this.options = {
			layout: {
				hierarchical: false
			},
			autoResize: true,
			physics: {
				barnesHut: {
					avoidOverlap: 0.8,
					gravitationalConstant: -5000,
					springConstant: 0.01,
					centralGravity: 0
				}
			},
			edges: {
				color: "#000000"
			}
		};
	}

	updateHint(name) {
		this.props.actions.hint.change(CONFIG.TEXT.HINT.SELECT_ASSOCIATION.replace('####', name));
	}

	updateConnectionsRootPerson(uuid, peopleData) {
		const person = peopleData.filter(person => {
			return person.id.indexOf(uuid) !== -1;
		})[0];

		this.props.actions.connectionsRoot.change(person);
		// this.props.actions.connectedPeopleChain.update([person]);
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

	render() {
		let style = {
			width: '100%',
			height: '600px'
		};
		if(!this.props.connectedPeopleChain.length) {
			return <div>Loadin...</div>;
		}
		let graph = {
			nodes: [],
			edges: []
		};
		let people = this.props.connectedPeopleChain.map(p => p.person);
		let nodes = people.map(p => ({
			id: p.id,
			label: p.prefLabel,
			size: 20,
			shape: "circularImage",
			image: p.img || 'https://randomuser.me/api/portraits/lego/7.jpg'
		}));
		graph.edges = nodes.map(p => ({
			from: this.props.connectionsRoot.id,
			to: p.id,
			length: 80
		}));
		nodes.push({id: this.props.connectionsRoot.id, label: this.props.prefLabel, size: 30, shape: 'circularImage', image: this.props.connectionsRoot.img});
		graph.nodes = [...nodes];
		return (
			<div className="connections-graph-container">
				<div id="connections-graph" className="connections-graph">
					<Graph style={style} graph={graph} options={this.options} events={this.events} />
				</div>
			</div>
		);
	}
}

ConnectionsGraphContainer.propTypes = {
	connectedPeopleChain: PropTypes.array.isRequired,
	connectionsRoot: PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired
};

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
