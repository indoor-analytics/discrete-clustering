import {Feature, lineString, LineString, Position} from "@turf/helpers";
import Graph from "graphology";
import dijkstra from 'graphology-shortest-path/dijkstra';
import distance from "@turf/distance";


function _nodeToPosition(
    node: string
): Position {
    return node.split(',').map(c => +c);
}


/**
 * This extracts a path linking a start position to an end position from a given
 * graph; this will try and select edges that feature the biggest weight possible.
 *
 * @param graph weighted-edges graph
 * @param start starting position (may not be a graph's edge)
 * @param end ending position (may not be a graph's edge)
 * @returns
 */
export function getClusteredPathFromGraph(
    graph: Graph,
    start: Position,
    end: Position
): Feature<LineString> {
    let startingNode = '';
    let endingNode = '';
    let startingDistance = Number.MAX_SAFE_INTEGER;
    let endingDistance = Number.MAX_SAFE_INTEGER;

    // looking for closest nodes to start/end positions
    graph.forEachNode(node => {
        const distanceToStart = distance(_nodeToPosition(node), start);
        if (distanceToStart < startingDistance) {
            startingNode = node;
            startingDistance = distanceToStart;
        }

        const distanceToEnd = distance(_nodeToPosition(node), end);
        if (distanceToEnd < endingDistance) {
            endingNode = node;
            endingDistance = distanceToEnd;
        }
    });

    // cloning graph and reversing its weights
    const graphClone = new Graph().import(graph.export());
    graphClone.forEachEdge(edge => {
        graphClone.setEdgeAttribute(
            edge,
            'weight',
            1 / graphClone.getEdgeAttribute(edge, 'weight')
        );
    });

    // computing the shortest path between start and end nodes
    const pathNodes = dijkstra.bidirectional(graphClone, startingNode, endingNode, (_, attr) => attr.weight);

    if (!pathNodes)
        throw new RangeError('Path cannot be extracted from graph, try using a smaller granularity.');

    return lineString(pathNodes.map(node => _nodeToPosition(node)));
}
