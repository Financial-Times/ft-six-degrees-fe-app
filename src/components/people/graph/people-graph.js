import './people-graph.css';

const MAX_RADIUS = 80,
    SPACE_BETWEEN_CIRCLES = 15;

let SVG, SVG_WIDTH, SVG_HEIGHT, MAX_MENTIONS;

class Graph {

    constructor(nodeClickCallback) {
        this.nodeClickCallback = nodeClickCallback;
        this.forceDependants = [];
    }

    toggleHint(circleElement, visible, emptyOrInitials) {
        if (emptyOrInitials) {
            d3.select(circleElement.parentNode).selectAll('.text-hint').classed('visible', visible);
        }
    }

    createImgId(name) {
        return name.toLowerCase().replace(/ /g, '-');
    }

    calculateRadius(mentions) {
        const percentage = parseInt(mentions, 10) * 100 / parseInt(MAX_MENTIONS, 10),
            proportionalRadius = Math.ceil((percentage / 100) * MAX_RADIUS);

        return proportionalRadius > 10 ? proportionalRadius : 10;
    }

    // Move d to be adjacent to the cluster node.
    clusterize(alpha) {
        return (d) => {

            if (this.node === d) {
                return;
            }

            let x = d.x - this.node.x,
                y = d.y - this.node.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + this.node.radius;

            if (l !== r) {
                l = (l - r) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                this.node.x += x;
                this.node.y += y;
            }
        };
    }

    // Resolves collisions between d and all other circles.
    collide(alpha) {
        const quadtree = d3.geom.quadtree(this.nodes);

        return function(d) {
            let r = d.radius + MAX_RADIUS + SPACE_BETWEEN_CIRCLES,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;

            quadtree.visit(function(quad, x1, y1, x2, y2) {
                const possible = !(x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1);

                if (quad.point && (quad.point !== d) && possible) {
                    let x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + SPACE_BETWEEN_CIRCLES,
                        m = Math.pow(quad.point.radius, 1),
                        mq = Math.pow(d.radius, 1),
                        mT = m + mq;

                    if (l < r) {

                        for(; Math.abs(l) === 0;) {
                            x = Math.round(Math.random() * r);
                            y = Math.round(Math.random() * r);
                            l = Math.sqrt(x * x + y * y);
                        }

                        //move the nodes away from each other along the radial (normal) vector
                        //taking relative mass into consideration, the sign is already established
                        //in calculating x and y and the nodes are modelled as spheres for calculating mass
                        l = (r - l) / l * (1 + alpha);
                        d.x += (x *= l) * m / mT;
                        d.y += (y *= l) * m / mT;
                        quad.point.x -= x * mq / mT;
                        quad.point.y -= y * mq / mT;
                    }
                }

                return !possible;
            });
        };
    }

    addImageDef(person) {
        const padding = person.radius * 0.75;
        let imageAnchor = this.createImgId(person.name.full);

        if (!document.getElementById(imageAnchor)) {
            this.defs
                .append('svg:pattern')
                    .attr('id', imageAnchor)
                    .attr('width', 1)
                    .attr('height', 1)
                    .attr('viewBox', '0 0 ' + person.radius * 2 + ' ' + person.radius * 2)
                .append('svg:image')
                    .attr('xlink:href', person.img)
                    .attr('width', person.radius * 2 + padding)
                    .attr('height', person.radius * 2 + padding)
                    .attr('x', - person.radius / 3)
                    .attr('y', - person.radius / 3);
        }

        return imageAnchor;
    }

    addGradientDef() {
        const gradient = this.defs
            .append('linearGradient')
            .attr('id', 'linear-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        gradient.append('stop')
            .attr('class', 'stop-top')
            .attr('offset', '0');

        gradient.append('stop')
            .attr('class', 'stop-middle')
            .attr('offset', '0.5');

        gradient.append('stop')
            .attr('class', 'stop-bottom')
            .attr('offset', '1');

    }

     createForce(width, height, tick) {
        return d3.layout.force()
            .nodes(this.nodes)
            .size([SVG_WIDTH, SVG_HEIGHT])
            .gravity(0.1)
            .charge(0)
            .friction(0.5)
            .on('tick', tick)
            .start()
    }

    applyForce() {
        const force = this.createForce(SVG_WIDTH, SVG_HEIGHT, (e) => {
            this.forceDependants.map(fn => {
                return fn(e);
            })
        });

        this.circles.call(force.drag);
    }

    addHints() {
        const hintContainers = d3.selectAll('g.node')
            .append('g')
            .attr('class', 'text-hint');

        this.hints = hintContainers.append('text')
            .text(d => {
                return d.name.abbrName;
            });

        this.forceDependants.push((e) => {
            this.hints
                .attr('dx', d => d.x + 10)
                .attr('dy', d => d.y + 10);
        });
    }

    addGradients() {
        this.addGradientDef();

        this.gradients = d3.selectAll('g.node')
            .each(function (d) {
                if (d.empty || !d.img) {
                    d3.select(this)
                        .classed('no-pic', true);
                }
            })
            .insert('circle', ':first-child')
            .attr('class', 'circle-gradient')
            .style('fill', 'url(#linear-gradient)')
            .attr('r', d => d.radius);

        this.forceDependants.push((e) => {
            this.gradients
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });
    }

    addPictures() {

        this.pictures = d3.selectAll('g.node')
            .each(function (d) {
                if (!d.empty && d.img) {
                    d3.select(this)
                        .classed('hide-plain', true);
                }
            })
            .insert('circle', ':first-child')
            .style('fill', d => {
                return d.empty && d.img ? '#9E2F50' : 'url(#' + this.addImageDef(d) + ')';
            })
            .attr('r', d => d.radius);


        this.forceDependants.push((e) => {
            this.pictures
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });
    }

    finalize() {
        d3.selectAll('.text-node').attr('class', 'text-node visible animated fadeIn');
        this.addGradients();
        this.addPictures();
        this.addHints();
    }

    addLabels() {

        function fitsTheCircle(textNode, d) {
            return textNode.getBBox().width < (d.radius * 2 - 30);
        }

        this.labels = SVG.selectAll('g.node')
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'text-node')
            .each(function (d) {
                const textNode = this;
                d3.select(textNode).text(d.name.abbrName);

                if (!fitsTheCircle(textNode, d)) {
                    d3.select(textNode).text(d.name.initials);
                    d.name.initialsInUse = true;

                    if (!fitsTheCircle(textNode, d)) {
                        d3.select(textNode).text(null);
                        d.empty = true;
                    }
                }
            });

        this.forceDependants.push(() => {
            this.labels
                .attr('dx', d => d.x)
                .attr('dy', d => {
                    return d.y + d.radius / (d.name.initialsInUse ? 1.75 : 2.5)
                });
        });

        this.finalize();
    }

    createCircles() {
        const self = this;
        let node, nodeEnter;

        node = SVG.select('.nodes').selectAll('g.node').data(this.nodes);

        nodeEnter = node.enter()
            .append('g')
            .attr('class', 'node');

        this.circles = nodeEnter
            .append('svg:circle')
            .attr('class', (d, index) => {
                if (index === 0) {
                    d.fixed = true;
                    d.x = SVG_WIDTH / 2;
                    d.y = SVG_HEIGHT / 2;
                }
                return d.user ? 'circle-node user' : 'circle-node';
            })
            .attr('r', d => d.radius)
            .attr('cx', d => {
                return d.radius;
            })
            .attr('cy', d => {
                return d.radius;
            })
            .on('click', (data) => {
                this.nodeClickCallback(data.id);
            })
            .on('mouseover', function (d) {
                self.toggleHint(this, true, d.empty || d.name.initialsInUse);
            })
            .on('mouseout', function (d) {
                self.toggleHint(this, false, d.empty || d.name.initialsInUse);
            });

        this.forceDependants.push((e) => {
            this.circles
                .each(this.clusterize(2 * e.alpha * e.alpha))
                .each(this.collide(0.5))
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });

        this.applyForce();
        this.addLabels();
    }

    createNodes() {
        SVG.append('g').attr('class', 'nodes');

        this.nodes = this.data.map((person, index) => {
            let radius;

            if (index === 0) {
                MAX_MENTIONS = person.articles;
                radius = MAX_RADIUS;
            } else {
                radius = this.calculateRadius(person.articles);
            }

            this.node = {
                id: person.id,
                radius: radius,
                cluster: 0,
                index: index,
                img: person.img,
                articles: person.articles,
                name: {
                    full: person.prefLabel,
                    initials: person.initials,
                    abbrName: person.abbrName
                }
            }

            if (person.user) {
                this.node.user = true;
            }

            return this.node;
        });

        this.createCircles();
    }

    createSvg() {
        const graphId = 'people-graph',
            element = document.getElementById(graphId);

        SVG_WIDTH = element.parentNode.offsetWidth;
        SVG_HEIGHT = element.parentNode.offsetHeight;

        const zoom = d3.behavior.zoom().scaleExtent([0.5, 1]).on('zoom', zoomed);

        SVG = d3.select('#' + graphId)
                .append('svg:svg')
                .attr('width', SVG_WIDTH)
                .attr('height', SVG_HEIGHT)
                .attr('id', 'svg')
                .attr('pointer-events', 'all')
                .attr('viewBox', '0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT)
                .attr('perserveAspectRatio', 'xMinYMid meet')
                .classed('svg-content-responsive', true)
                .call(zoom)
                .append('svg:g')
                .attr('class', 'g-wrapper');

        this.defs = d3.select('#svg').append('svg:defs');

        window.onresize = function () {
            d3.select('#' + graphId + ' svg:first-child').attr('width', element.parentNode.offsetWidth).attr('height', element.parentNode.offsetHeight);
        };

        function zoomed(pos, sc) {
            const position = pos || zoom.translate(),
                scale = sc || zoom.scale();

            SVG.attr('transform', 'translate(' + position + ')scale(' + scale + ')');
        }

        this.createNodes();
    }

    draw(data, peopleRange) {
        this.clear();
        if (data) {
            this.peopleRange = peopleRange;
            this.data = data;
            this.createSvg();
        }
    }

    clear() {
        SVG = null;
        d3.select('#people-graph').html(null);
    }
}

export default Graph;