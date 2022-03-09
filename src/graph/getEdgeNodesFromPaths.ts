import Graph from "graphology";
import {FeatureCollection, LineString} from "@turf/helpers";


/**
 * Extracts graph nodes that are most representative of input paths beginning
 * positions and ending positions.
 * @param _graph
 * @param _paths
 */
export function getEdgeNodesFromPaths(
    _graph: Graph,
    _paths: FeatureCollection<LineString>
): {
    start: string,
    end: string
} {
    throw new Error('not implemented');
}
