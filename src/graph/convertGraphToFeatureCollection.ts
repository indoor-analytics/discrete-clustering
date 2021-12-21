import {Feature, featureCollection, FeatureCollection, point} from "@turf/helpers";
import Graph from "graph-data-structure";
interface Serialized {
    nodes: {
        id: string;
    }[];
    links: {
        source: string;
        target: string;
        weight: string;
    }[];
}

export function convertGraphToFeatureCollection (
    graph: typeof Graph
): FeatureCollection {
    // @ts-ignore
    const serializedGraph: Serialized = graph.serialize();

    const features: Feature[] = [];
    features.push(...serializedGraph.nodes.map((node) => {
        return point(node.id.split(',').map(c => +c))
    }))

    return featureCollection(features);
}
