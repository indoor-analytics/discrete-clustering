import {Feature, FeatureCollection, LineString, Position} from "@turf/helpers";
import {Shape} from "./Shape";
import {clusterSpace} from "../recursive/clusterSpace";
import {convertPolygonsToGraph} from "../graph/convertPolygonsToGraph";
import {getClusteredPathFromGraph} from "../graph/getClusteredPathFromGraph";

/**
 * Converts a bunch of paths into a single path representing them.
 * (this is a convenience method that only calls this package's other methods)
 *
 * @param paths input paths to cluster
 * @param startPosition starting position (may not be a graph edge)
 * @param endPosition ending position (may not be a graph edge)
 * @param targetDepth number of iterations wanted (the bigger, the smaller the discretization)
 * @param shape shape used to discretize space
 */
export function getClusteredPath (
    paths: FeatureCollection<LineString>,
    startPosition: Position,
    endPosition: Position,
    targetDepth = 5,
    shape: Shape = Shape.Triangle
): Feature<LineString> {
    const cells = clusterSpace(paths, targetDepth, true, shape);
    const graph = convertPolygonsToGraph(cells);
    return getClusteredPathFromGraph(graph, startPosition, endPosition);
}
