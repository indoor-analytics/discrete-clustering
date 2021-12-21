import {Feature, featureCollection, FeatureCollection, point} from "@turf/helpers";
import {Serialized} from "./types/Serialized";
import {Graph} from "./types/Graph";

export function convertGraphToFeatureCollection (
    graph: Graph
): FeatureCollection {
    const serializedGraph: Serialized = graph.serialize();

    const features: Feature[] = [];
    features.push(...serializedGraph.nodes.map((node) => {
        return point(node.id.split(',').map(c => +c))
    }))

    return featureCollection(features);
}
