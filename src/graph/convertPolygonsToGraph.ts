import Graph from "graph-data-structure";
import {featureCollection, FeatureCollection, Polygon} from "@turf/helpers";
import centroid from "@turf/centroid";

export function convertPolygonsToGraph(
    cells: FeatureCollection<Polygon, {weight: number}>
): typeof Graph {
    const graph = Graph();
    const cellsCopy: FeatureCollection<Polygon, {weight: number, nodeId: string}> =
        featureCollection(cells.features) as FeatureCollection<Polygon, {weight: number, nodeId: string}>;

    // adding a node for each polygon
    for (const cell of cellsCopy.features) {
        cell.properties.nodeId = `${centroid(cell).geometry.coordinates}`;
        graph.addNode(cell.properties.nodeId);
    }

    // @ts-ignore
    return graph;
}
