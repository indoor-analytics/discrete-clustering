import {Feature, featureCollection, FeatureCollection, lineString, point} from "@turf/helpers";
import {Serialized} from "./types/Serialized";
import {Graph} from "./types/Graph";


interface ConversionSettings {
    exportCellsCentroids: boolean,
    maximumWidth: number
}

const defaultConversionSettings: ConversionSettings = {
    exportCellsCentroids: false,
    maximumWidth: 10
};


export function convertGraphToFeatureCollection (
    graph: Graph,
    conversionSettings: Partial<ConversionSettings> = {}
): FeatureCollection {
    const settings: ConversionSettings = {...defaultConversionSettings, ...conversionSettings};
    const serializedGraph: Serialized = graph.serialize();

    const features: Feature[] = [];

    if (settings.exportCellsCentroids)
        features.push(...serializedGraph.nodes.map((node) => {
            return point(node.id.split(',').map(c => +c))
        }));

    // looking for maximum weight
    let localMaximum = 0;
    for (const link of serializedGraph.links)
        if (link.weight > localMaximum)
            localMaximum = link.weight;

    const lines = serializedGraph.links.map(link => {
        return lineString(
            [
                link.source.split(',').map(c => +c),
                link.target.split(',').map(c => +c)
            ],
            {
                'stroke-width': (link.weight / localMaximum) * settings.maximumWidth,
                weight: link.weight
            }
        );
    });


    features.push(...lines);

    return featureCollection(features);
}
