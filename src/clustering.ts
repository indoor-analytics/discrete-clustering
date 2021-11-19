import {Feature, FeatureCollection, LineString, Polygon} from "@turf/helpers";

export function discreteClustering(
    zoneOfInterest: Feature<Polygon>,
    paths: Feature<LineString>[],
    granularity: number
): FeatureCollection {
    return null;
}
