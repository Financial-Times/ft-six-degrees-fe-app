import './connections-graph.css';
let SVG, SVG_WIDTH, SVG_HEIGHT;

export default class Graph {

	draw(connections) {
		const graphId = 'connections-graph',
		      element = document.getElementById(graphId);

		SVG_WIDTH = element.parentNode.offsetWidth;
		SVG_HEIGHT = element.parentNode.offsetHeight;

		SVG = d3.select(`#${graphId}`).append('svg')
			.attr('width', SVG_WIDTH)
			.attr('height', SVG_HEIGHT);

		const force = d3.layout.force()
			.size([SVG_WIDTH, SVG_HEIGHT])
			.linkDistance(180)
			.charge(-1000)
			.on('tick', tick);

		let link = SVG.selectAll('.connection-link'),
		    node = SVG.selectAll('.connection-node');

		update();

		function update() {
			let nodes = flatten(connections),
			    links = d3.layout.tree().links(nodes);

			force
				.nodes(nodes)
				.links(links)
				.start();

			link = link.data(links, (d) => d.target.id);

			link.exit().remove();

			link.enter().insert('line', '.connection-node')
				.attr('class', 'connection-link')
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			node = node.data(nodes, (d)  => d.id).style('fill', '#9e2f50');

			node.exit().remove();

			node.enter().append('circle')
				.attr('class', 'connection-node')
				.attr('cx', (d) => d.x)
				.attr('cy', (d) => d.y)
				.attr('r', (d) => d.children ? 40 : 30 )
				.style('fill', '#9e2f50')
				.on('click', click)
				.call(force.drag);
		}

		function tick() {
			link.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			node.attr('cx', (d) => d.x)
				.attr('cy', (d) => d.y);
		}

		function click(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			update();
		}

		function flatten(root) {
			let nodes = [], i = 0;

			function recurse(node) {
				if (node.children) node.children.forEach(recurse);
				if (!node.id) node.id = ++i;
				nodes.push(node);
			}

			recurse(root);
			return nodes;
		}
	}
}
