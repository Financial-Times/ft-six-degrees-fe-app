const graphOptions = {
	height: '500px',
	layout: {
		hierarchical: false
	},
	autoResize: true,
	// physics: {
	// 	repulsion: {
	// 		centralGravity: 0.1,
	// 		springLength: 250,
	// 		nodeDistance: 250,
	// 		springConstant: 0.05,
	// 		damping: 0.09
	// 	}
	// },
	// stabilizationIterations: 1000,
	physics: {
		timestep: 0.3,
		forceAtlas2Based: {
			gravitationalConstant: -150,
			centralGravity: 0.03,
			springLength: 150
		},
		minVelocity: 0.50,
		solver: 'forceAtlas2Based',
		stabilization: {
			enabled: true,
			iterations: 300,
			updateInterval: 10,
			fit: true
		},
		adaptiveTimestep: true
	},
	// physics: {
	// 	barnesHut: {
	// 		avoidOverlap: 0.8,
	// 		gravitationalConstant: -5000,
	// 		springConstant: 0.01,
	// 		centralGravity: 0
	// 	},
	// 	// repulsion: {
	// 	// 	centralGravity: 0,
	// 	// 	springLength: 250,
	// 	// 	nodeDistance: 250,
	// 	// 	springConstant: 0.05,
	// 	// 	damping: 0.09
	// 	// },
	// 	stabilization: {
	// 		enabled: true,
	// 		iterations: 1000,
	// 		updateInterval: 100,
	// 		onlyDynamicEdges: false,
	// 		fit: true
	// 	}
	// },
	interaction: {
		hover: true,
		selectable: true
	},
	edges: {
		smooth: false,
		color: "#000000"
	}
};

export default graphOptions;
