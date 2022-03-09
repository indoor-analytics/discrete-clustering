import Graph from "graphology";
import {featureCollection, FeatureCollection, LineString, point, Position} from "@turf/helpers";
import distance from "@turf/distance";
import centroid from "@turf/centroid";


function _nodeToPosition(
    node: string
): Position {
    return node.split(',').map(c => +c);
}


/**
 * Extracts graph nodes that are most representative of input paths beginning
 * positions and ending positions.
 * @param graph
 * @param paths
 */
export function getEdgeNodesFromPaths(
    graph: Graph,
    paths: FeatureCollection<LineString>
): {
    start: string,
    end: string
} {
    // compute start and end centroids
    const startPositions = featureCollection([]);
    const endPositions = featureCollection([]);
    paths.features.forEach(path => {
        startPositions.features.push(
            point(path.geometry.coordinates[0])
        );
        endPositions.features.push(
            point(path.geometry.coordinates[path.geometry.coordinates.length-1])
        );
    });
    const startCentroid = centroid(startPositions);
    const endCentroid = centroid(endPositions);

    let startingNode = '';
    let endingNode = '';
    let startingDistance = Number.MAX_SAFE_INTEGER;
    let endingDistance = Number.MAX_SAFE_INTEGER;

    // looking for closest nodes to start/end positions
    graph.forEachNode(node => {
        const distanceToStart = distance(_nodeToPosition(node), startCentroid);
        if (distanceToStart < startingDistance) {
            startingNode = node;
            startingDistance = distanceToStart;
        }

        const distanceToEnd = distance(_nodeToPosition(node), endCentroid);
        if (distanceToEnd < endingDistance) {
            endingNode = node;
            endingDistance = distanceToEnd;
        }
    });

    return {
        start: startingNode,
        end: endingNode
    };
}
