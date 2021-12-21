import {Feature, FeatureCollection, featureCollection, LineString, Polygon} from "@turf/helpers";
import {Shape} from "../Shape";
import envelope from "@turf/envelope";
import {getCellsFromArea} from "../getCellsFromArea";
import {markCellsWithPaths} from "../markCellsWithPaths";
import Graph from "graph-data-structure";
import {convertPolygonsToGraph} from "./convertPolygonsToGraph";

export function getClusteredGraph(
    paths: Feature<LineString>[],
    granularity: number,
    shape = Shape.Square
): typeof Graph {
    const testZone = envelope(featureCollection(paths));
    const zoneCells = getCellsFromArea(testZone, granularity, shape);
    const markedCells = markCellsWithPaths(zoneCells, paths);
    return convertPolygonsToGraph(markedCells as FeatureCollection<Polygon, {weight: number}>);
}
