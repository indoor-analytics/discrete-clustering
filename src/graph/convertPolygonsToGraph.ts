import {featureCollection, FeatureCollection, Polygon} from "@turf/helpers";
import centroid from "@turf/centroid";
import lineOverlap from "@turf/line-overlap";
import Graph from 'graphology';

/**
 * Converts a set of weighted cells to a graph.
 * The returned graph has nodes for each of input cells, and edges linking nodes
 * have a weight attribute showing number of paths represented.
 * 
 * @param cells weighted cells
 * @returns weighted-edges graph
 */
export function convertPolygonsToGraph(
    cells: FeatureCollection<Polygon, {weight: number}>
): Graph {
    const graph = new Graph();
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
            graph.addEdgeWithKey(
                `${cell.properties.nodeId}/${neighbour.properties.nodeId}`,
                cell.properties.nodeId, neighbour.properties.nodeId,
                {
                    weight: cell.properties.weight > neighbour.properties.weight
                        ? neighbour.properties.weight
                        : cell.properties.weight
                }
            )
        }
    }

    return graph;
}
