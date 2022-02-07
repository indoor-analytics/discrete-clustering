import {Feature, FeatureCollection, LineString, Polygon} from "@turf/helpers";

export function getPathsEnvelope(
    _paths: FeatureCollection<LineString>
): Feature<Polygon> {
    throw new Error('unimplemented');
}
