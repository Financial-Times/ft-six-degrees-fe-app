import './connections-graph.css';
import cloneDeep from 'lodash/cloneDeep';
let SVG, SVG_WIDTH, SVG_HEIGHT;
let connectionsData = null;

export default class Graph {

	draw(connections) {

		if (!this.dataCache || (this.dataCache && JSON.stringify(this.dataCache) !== JSON.stringify(connections))) {
			this.dataCache = Object.assign({}, connections);
			this.clear();
			if (connections) {
				connectionsData = cloneDeep(connections);
			}
		}

		const graphId = 'connections-graph',
		      element = document.getElementById(graphId),
		      maxNodeSize = 50,

		      SVG_WIDTH = element.parentNode.offsetWidth;
		SVG_HEIGHT = element.parentNode.offsetHeight;

		SVG = d3.select(`#${graphId}`).append('svg')
			.attr('width', SVG_WIDTH)
			.attr('height', SVG_HEIGHT);

		const force = d3.layout.force();

		let link = SVG.selectAll('.connection-link');

		update(connectionsData);

		function update(connections) {
			let nodes = flatten(connections),
			    links = d3.layout.tree().links(nodes);

			// Restart the force layout.
			force.nodes(nodes)
				.links(links)
				.gravity(0.05)
				.charge(-1000)
				.linkDistance(180)
				.friction(0.5)
				.linkStrength(function(l, i) {return 1; })
				.size([SVG_WIDTH, SVG_HEIGHT])
				.on("tick", tick)
				.start();

			link = link.data(links, (d) => d.target.id);

			link.enter().insert('line', '.connection-node')
				.attr('class', 'connection-link')
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			// Exit any old paths.
			link.exit().remove();

			// Update the nodes…
			let node = SVG.selectAll("g.node")
				.data(nodes, function(d) { return d.id; });

			// Enter any new nodes.
			let nodeEnter = node.enter().append("svg:g")
				.attr("class", "node")
				.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
				.on("click", click)
				.call(force.drag);

			// Append a circle
			nodeEnter.append("svg:circle")
				.attr("r", (d) => d.children ? 40 : 30)
				.style('fill', '#9e2f50');


			nodeEnter.append('svg:pattern')
				.attr('width', 1)
				.attr('height', 1)
				.attr('viewBox', '0 0 ' + 60 + ' ' + 60);
			// Append images
			nodeEnter.append("svg:image")
				.attr("xlink:href",  function(d) { return d.img; })
				.attr("x", function(d) { return -25;})
				.attr("y", function(d) { return -25;})
				.attr("height", 50)
				.attr("width", 50);

			// Exit any old nodes.
			node.exit().remove();

			// Re-select for update.
			link = SVG.selectAll(".connection-link");
			node = SVG.selectAll("g.node");

			function tick() {
				link.attr('x1', (d) => d.source.x)
					.attr('y1', (d) => d.source.y)
					.attr('x2', (d) => d.target.x)
					.attr('y2', (d) => d.target.y);
				node.attr("transform", nodeTransform);
			}
		}

		/**
		 * Gives the coordinates of the border for keeping the nodes inside a frame
		 * http://bl.ocks.org/mbostock/1129492
		 */
		function nodeTransform(d) {
			d.x =  Math.max(maxNodeSize, Math.min(SVG_WIDTH - (d.imgwidth/2 || 16), d.x));
			d.y =  Math.max(maxNodeSize, Math.min(SVG_HEIGHT - (d.imgheight/2 || 16), d.y));
			return "translate(" + d.x + "," + d.y + ")";
		}

		/**
		 * Toggle children on click.
		 */
		function click(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			update(connectionsData);
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

	clear() {
		SVG = null;
		d3.select('#connections-graph').html(null);
	}
}
