import { Feature, Polygon, LineString, FeatureCollection } from "@turf/helpers";
import { getCellsFromArea } from "./getCellsFromArea";
import { markCellsWithPaths } from "./markCellsWithPaths";

/* export all public methods here */
export function discreteClustering(
    zoneOfInterest: Feature<Polygon>,
    paths: Feature<LineString>[],
    granularity: number // TODO implement within getCellsFromArea
): FeatureCollection {
    const zoneCells = getCellsFromArea(zoneOfInterest);
    return markCellsWithPaths(zoneCells, paths);
}

