import { Feature, FeatureCollection, LineString, Polygon } from "@turf/helpers";

export function clusterSpace (
    _paths: Feature<LineString>,
    _zone: Feature<Polygon>,
    _targetDepth: number,
    _currentDepth = 0
): FeatureCollection<Polygon, {weight: number}> {
    // TODO ensure that targetDepth >= 1
    // TODO throw if there are paths outside zone

    throw new Error('Not implemented');
}