import { Feature, Polygon, LineString, FeatureCollection } from "@turf/helpers";
import { getCellsFromArea } from "./getCellsFromArea";
import { markCellsWithPaths } from "./markCellsWithPaths";
import {colorCells} from "./colorCells";

/* export all public methods here */
export function discreteClustering(
    zoneOfInterest: Feature<Polygon>,
    paths: Feature<LineString>[],
    granularity: number
): FeatureCollection {
    const zoneCells = getCellsFromArea(zoneOfInterest, granularity);
    const markedCells = markCellsWithPaths(zoneCells, paths);
    return colorCells(markedCells as FeatureCollection<Polygon, {weight: number}>);
}

