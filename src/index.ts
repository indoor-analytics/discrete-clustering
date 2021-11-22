import { Feature, Polygon, LineString, FeatureCollection } from "@turf/helpers";
import { getCellsFromArea } from "./getCellsFromArea";
import { markCellsWithPaths } from "./markCellsWithPaths";
import {colorCells} from "./colorCells";
import {Shape} from "./Shape";

/* export all public methods here */
export function discreteClustering(
    zoneOfInterest: Feature<Polygon>,
    paths: Feature<LineString>[],
    granularity: number,
    shape = Shape.Square
): FeatureCollection {
    const zoneCells = getCellsFromArea(zoneOfInterest, granularity, shape);
    const markedCells = markCellsWithPaths(zoneCells, paths);
    return colorCells(markedCells as FeatureCollection<Polygon, {weight: number}>);
}

