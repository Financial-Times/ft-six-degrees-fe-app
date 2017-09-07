import { PLACEHOLDER_IMG, graphOptions as graphConfig } from '../../config';
const { grey } = graphConfig.color;

const graphOptions = {
	layout: {
		hierarchical: false
	},
	autoResize: true,
	nodes: {
		color: {
			background: grey
		},
		chosen: { node: false },
		borderWidthSelected: 0,
		shape: 'circularImage',
		brokenImage: PLACEHOLDER_IMG
	},
	physics: {
		timestep: 0.3,
		forceAtlas2Based: {
			gravitationalConstant: -150,
			centralGravity: 0.03,
			springLength: 150
		},
		minVelocity: 0.5,
		solver: 'forceAtlas2Based',
		stabilization: {
			enabled: true,
			iterations: 2000,
			onlyDynamicEdges: false,
			updateInterval: 100,
			fit: true
		},
		adaptiveTimestep: true
	},
	interaction: {
		dragView: false,
		zoomView: false,
		hover: true,
		selectable: true
	},
	edges: {
		smooth: false,
		chosen: false,
		width: 2,
		arrows: {
			to: { enabled: false },
			middle: { enabled: false },
			from: { enabled: false }
		}
	}
};

export default graphOptions;
