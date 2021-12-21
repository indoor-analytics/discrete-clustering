import {featureCollection, FeatureCollection, point} from "@turf/helpers";
import Graph from "graph-data-structure";

export function convertGraphToFeatureCollection (
    graph: typeof Graph
): FeatureCollection {
    return featureCollection(
        // @ts-ignore
        graph.nodes().map((node: string) => {
            return point(node.split(',').map(c => +c))
        })
    );
}
