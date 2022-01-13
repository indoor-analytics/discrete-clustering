import {Feature, FeatureCollection, featureCollection, LineString, Polygon} from "@turf/helpers";
import {Shape} from "../Shape";
import envelope from "@turf/envelope";
import {getCellsFromArea} from "../getCellsFromArea";
import {markCellsWithPaths} from "../markCellsWithPaths";
import {convertPolygonsToGraph} from "./convertPolygonsToGraph";
import Graph from "graphology";
// import {Graph as GraphType} from './types/Graph';

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
