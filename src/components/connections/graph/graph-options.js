const graphOptions = {
	height: '600px',
	layout: {
		hierarchical: false
	},
	autoResize: true,
	// smoothCurves: true,
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
		forceAtlas2Based: {
			gravitationalConstant: -138,
			centralGravity: 0.02,
			springLength: 100
		},
		minVelocity: 0.75,
		solver: 'forceAtlas2Based',
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
	edges: {
		color: "#000000"
	}
};

export default graphOptions;
