import {Feature, featureCollection, FeatureCollection, LineString, Polygon} from "@turf/helpers";

export function markCellsWithPaths(
    cells: FeatureCollection<Polygon>,
    paths: Feature<LineString>[]
): FeatureCollection {
    if (cells.features.length === 0)
        throw new RangeError('Cells collection must not be empty.');
    if (paths.length === 0)
        throw new RangeError('Paths array must not be empty.');
    return featureCollection([]);
}
