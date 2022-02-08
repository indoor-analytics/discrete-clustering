import clone from "@turf/clone";
import {Feature, featureCollection, FeatureCollection, LineString, Polygon} from "@turf/helpers";
import lineIntersect from "@turf/line-intersect";


/**
 * Checks intersections with all cells and all inputs paths, and
 * attribute a weight to each cell according to the number of
 * paths that intersect it.
 * This does not return cells that are not crossed by a path.
 *
 * @param cells grid cells to weight
 * @param paths paths to check intersections against
 * @returns an ensemble of cells with a weight attribute each
 */
export function markCellsWithPaths(
    cells: FeatureCollection<Polygon>,
    paths: Feature<LineString>[]
): FeatureCollection<Polygon, {weight: number}> {
    if (cells.features.length === 0)
        throw new RangeError('Cells collection must not be empty.');
    if (paths.length === 0)
        throw new RangeError('Paths array must not be empty.');

    const localCells = clone(cells);

    // increasing cells' weight if they intersect with a path
    for (const path of paths) {
        for (const cell of localCells.features) {
            if (lineIntersect(path, cell).features.length !== 0) {
                if (cell.properties?.weight === undefined)
                    (cell as Feature<Polygon, {weight: number}>).properties.weight = 1;
                else
                    cell.properties.weight += 1;
            }
        }
    }

    // filter out cells that are not crossed by a path
    return featureCollection(localCells.features.filter((cell: Feature<Polygon, {weight?: number}>) => {
        return cell.properties.weight !== undefined;
    }));
}
