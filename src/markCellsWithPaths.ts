import {Feature, FeatureCollection, LineString, Polygon} from "@turf/helpers";
import lineIntersect from "@turf/line-intersect";

export function markCellsWithPaths(
    cells: FeatureCollection<Polygon>,
    paths: Feature<LineString>[]
): FeatureCollection {
    if (cells.features.length === 0)
        throw new RangeError('Cells collection must not be empty.');
    if (paths.length === 0)
        throw new RangeError('Paths array must not be empty.');

    for (const path of paths) {
        for (const cell of cells.features) {
            if (lineIntersect(path, cell) !== null) {
                if (cell.properties?.weight === undefined)
                    (cell as Feature<Polygon, {weight: number}>).properties.weight = 0;
                else
                    cell.properties.weight += 1;
            }
        }
    }

    return cells;
}
