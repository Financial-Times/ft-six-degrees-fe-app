const graphOptions = {
	height: '500px',
	layout: {
		hierarchical: false
	},
	autoResize: true,
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
			iterations: 500,
			updateInterval: 50,
			fit: true
		},
		adaptiveTimestep: true
	},
	interaction: {
		hover: true,
		selectable: true
	},
	edges: {
		smooth: false,
		color: '#000000'
	}
};

export default graphOptions;
