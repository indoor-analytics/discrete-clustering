import Graph from "graph-data-structure";
import {Feature, FeatureCollection, Polygon} from "@turf/helpers";

export function convertPolygonsToGraph(
    cells: FeatureCollection
): typeof Graph {
    const graph = Graph();

    // adding a node for each polygon
    for (const polygon of cells.features) {
        const cell = polygon as Feature<Polygon>;
        const coordinates = `${cell.geometry.coordinates}`;
        graph.addNode(coordinates);
    }

    // @ts-ignore
    return graph;
}
