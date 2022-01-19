import {Feature, featureCollection, FeatureCollection, Polygon} from "@turf/helpers";
import centroid from "@turf/centroid";
import Graph from 'graphology';
import distance from "@turf/distance";

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
    const neighbourDistance = _getNeighbourDistance(cellsCopy.features[0]);

    for (const cell of cellsCopy.features) {
        const cellCentroid = centroid(cell);
        const neighbours = cellsCopy.features.filter(fCell => distance(cellCentroid, centroid(fCell)) < neighbourDistance && cell.properties.nodeId !== fCell.properties.nodeId)

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

/**
 * Returns a distance that allows to pick one cell's neighbours.
 *
 * @param cell grid cells sample
 */
function _getNeighbourDistance(cell: Feature<Polygon>): number {
    const coordinates = cell.geometry.coordinates[0]

    switch (coordinates.length) {
    case 4:
        // triangle
        return Math.max(
            distance(coordinates[0], coordinates[1]),
            distance(coordinates[1], coordinates[2]),
            distance(coordinates[2], coordinates[3])
        );
    case 5:
        // square
        return distance(coordinates[0], coordinates[2]);
    case 7:
        // hexagon
        return distance(coordinates[0], coordinates[3]);
    default:
        throw new RangeError('unknown shape');
    }
}
