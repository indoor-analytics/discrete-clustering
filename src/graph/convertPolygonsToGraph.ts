import Graph from "graph-data-structure";
import {FeatureCollection, Polygon} from "@turf/helpers";
import centroid from "@turf/centroid";

export function convertPolygonsToGraph(
    cells: FeatureCollection<Polygon, {weight: number}>
): typeof Graph {
    const graph = Graph();

    // adding a node for each polygon
    for (const cell of cells.features) {
        const coordinates = `${centroid(cell).geometry.coordinates}`;
        graph.addNode(coordinates);
    }

    // @ts-ignore
    return graph;
}
