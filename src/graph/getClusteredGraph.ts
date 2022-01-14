import {Feature, FeatureCollection, featureCollection, LineString, Polygon} from "@turf/helpers";
import {Shape} from "../utils/Shape";
import envelope from "@turf/envelope";
import {getCellsFromArea} from "../zones/getCellsFromArea";
import {markCellsWithPaths} from "../zones/markCellsWithPaths";
import {convertPolygonsToGraph} from "./convertPolygonsToGraph";
import Graph from "graphology";

/**
 * This computes a graph whose edges have a weight representing number of paths
 * they represent.
 * 
 * @param paths input paths to cluster
 * @param granularity size of grid cells (increase this to reduce cells' size)
 * @param shape shape used to create grid cells
 * @returns weighted-edges graph
 */
export function getClusteredGraph(
    paths: Feature<LineString>[],
    granularity: number,
    shape = Shape.Square
): Graph {
    const testZone = envelope(featureCollection(paths));
    const zoneCells = getCellsFromArea(testZone, granularity, shape);
    const markedCells = markCellsWithPaths(zoneCells, paths);
    return convertPolygonsToGraph(markedCells as FeatureCollection<Polygon, {weight: number}>);
}
