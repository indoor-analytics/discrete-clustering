import {Feature, featureCollection, FeatureCollection, lineString, point} from "@turf/helpers";
import {Serialized} from "./types/Serialized";
import {Graph} from "./types/Graph";

export function convertGraphToFeatureCollection (
    graph: Graph,
    exportCellsCentroids = false
): FeatureCollection {
    const serializedGraph: Serialized = graph.serialize();

    const features: Feature[] = [];

    if (exportCellsCentroids)
        features.push(...serializedGraph.nodes.map((node) => {
            return point(node.id.split(',').map(c => +c))
        }));
    features.push(...serializedGraph.links.map(link => {
        return lineString(
            [
                link.source.split(',').map(c => +c),
                link.target.split(',').map(c => +c)
            ]
        );
    }));

    return featureCollection(features);
}
