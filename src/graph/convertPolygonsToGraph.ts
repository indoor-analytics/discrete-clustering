import Graph from "graph-data-structure";
import {Feature, FeatureCollection, Polygon} from "@turf/helpers";
import centroid from "@turf/centroid";

export function convertPolygonsToGraph(
    cells: FeatureCollection
): typeof Graph {
    const graph = Graph();

    // adding a node for each polygon
    for (const polygon of cells.features) {
        const coordinates = `${centroid(polygon as Feature<Polygon>).geometry.coordinates}`;
        graph.addNode(coordinates);
    }

    // @ts-ignore
    return graph;
}
