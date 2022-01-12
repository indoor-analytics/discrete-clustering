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

    // looking for maximum weight
    let localMaximum = 0;
    for (const link of serializedGraph.links)
        if (link.weight > localMaximum)
            localMaximum = link.weight;

    const MAXIMUM_WIDTH = 10;
    const lines = serializedGraph.links.map(link => {
        return lineString(
            [
                link.source.split(',').map(c => +c),
                link.target.split(',').map(c => +c)
            ],
            {
                'stroke-width': (link.weight / localMaximum) * MAXIMUM_WIDTH
            }
        );
    });


    features.push(...lines);

    return featureCollection(features);
}
