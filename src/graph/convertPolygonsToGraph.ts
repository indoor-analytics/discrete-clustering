import {featureCollection, FeatureCollection, Polygon} from "@turf/helpers";
import centroid from "@turf/centroid";
import {Graph as GraphType} from "./types/Graph";
import Graph from "graph-data-structure";
import lineOverlap from "@turf/line-overlap";

export function convertPolygonsToGraph(
    cells: FeatureCollection<Polygon, {weight: number}>
): GraphType {
    const graph = Graph();
    const cellsCopy: FeatureCollection<Polygon, {weight: number, nodeId: string}> =
        featureCollection(cells.features) as FeatureCollection<Polygon, {weight: number, nodeId: string}>;

    // adding a node for each polygon
    for (const cell of cellsCopy.features) {
        cell.properties.nodeId = `${centroid(cell).geometry.coordinates}`;
        graph.addNode(cell.properties.nodeId);
    }

    // adding edges between each neighbour
    for (const cell of cellsCopy.features) {
        const neighbours = cellsCopy.features.filter(fCell => lineOverlap(cell, fCell, {tolerance: 0.001}).features.length !== 0 && cell.properties.nodeId !== fCell.properties.nodeId);
        for (const neighbour of neighbours) {
            graph.addEdge(
                cell.properties.nodeId, neighbour.properties.nodeId,
                cell.properties.weight > neighbour.properties.weight
                    ? neighbour.properties.weight
                    : cell.properties.weight
            )
        }
    }

    return graph;
}
