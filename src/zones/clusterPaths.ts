import {Feature, Polygon, LineString, FeatureCollection, featureCollection} from "@turf/helpers";
import { getCellsFromArea } from "./getCellsFromArea";
import { markCellsWithPaths } from "./markCellsWithPaths";
import {colorCells} from "./colorCells";
import {Shape} from "../utils/Shape";
import envelope from "@turf/envelope";

/**
 * This will compute the smallest polygon containing all input paths, discretize
 * it using provided shape and shape size, and will compute intersections of
 * paths with grid cells; each intersected cell will be marked with a weight
 * indicating the number of paths that cross it, and an according color opacity.
 *
 * @param paths input paths to cluster
 * @param granularity size of grid cells (increase this to reduce cells' size)
 * @param shape shape used to create grid cells
 * @param shouldColorCells adds fill-opacity attribute to cells regarding their weight
 * @returns weightened cells
 */
export function clusterPaths(
    paths: Feature<LineString>[],
    granularity: number,
    shape = Shape.Square,
    shouldColorCells = true
): FeatureCollection {
    const testZone = envelope(featureCollection(paths));
    const zoneCells = getCellsFromArea(testZone, granularity, shape);
    const markedCells = markCellsWithPaths(zoneCells, paths);

    return shouldColorCells 
        ? colorCells(markedCells as FeatureCollection<Polygon, {weight: number}>)
        : markedCells;
}
