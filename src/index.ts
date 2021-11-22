import {Feature, Polygon, LineString, FeatureCollection, featureCollection} from "@turf/helpers";
import { getCellsFromArea } from "./getCellsFromArea";
import { markCellsWithPaths } from "./markCellsWithPaths";
import {colorCells} from "./colorCells";
import {Shape} from "./Shape";
import envelope from "@turf/envelope";

/* export all public methods here */
export function discreteClustering(
    paths: Feature<LineString>[],
    granularity: number,
    shape = Shape.Square
): FeatureCollection {
    const testZone = envelope(featureCollection(paths));
    const zoneCells = getCellsFromArea(testZone, granularity, shape);
    const markedCells = markCellsWithPaths(zoneCells, paths);
    return colorCells(markedCells as FeatureCollection<Polygon, {weight: number}>);
}

