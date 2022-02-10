import {Feature, FeatureCollection, LineString, Position} from "@turf/helpers";
import {Shape} from "./Shape";
import {clusterSpace} from "../recursive/clusterSpace";
import {convertPolygonsToGraph} from "../graph/convertPolygonsToGraph";
import {getClusteredPathFromGraph} from "../graph/getClusteredPathFromGraph";


interface ClusteringSettings {
    /* Number of iterations wanted (the bigger, the smaller the discretization). */
    targetDepth: number,

    /* Shape used to discretize space. */
    shape: Shape
}

const defaultClusteringSettings: ClusteringSettings = {
    targetDepth: 5,
    shape: Shape.Triangle
};


/**
 * Converts a bunch of paths into a single path representing them.
 * (this is a convenience method that only calls this package's other methods)
 *
 * @param paths input paths to cluster
 * @param startPosition starting position (may not be a graph edge)
 * @param endPosition ending position (may not be a graph edge)
 * @param clusteringSettings optional settings to customize path generation
 */
export function getClusteredPath (
    paths: FeatureCollection<LineString>,
    startPosition: Position,
    endPosition: Position,
    clusteringSettings: Partial<ClusteringSettings> = {}
): Feature<LineString> {
    const settings: ClusteringSettings = {...defaultClusteringSettings, ...clusteringSettings};
    const cells = clusterSpace(paths, settings.targetDepth, true, clusteringSettings.shape);
    const graph = convertPolygonsToGraph(cells);
    return getClusteredPathFromGraph(graph, startPosition, endPosition);
}
