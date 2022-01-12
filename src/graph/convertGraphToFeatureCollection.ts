import {Feature, featureCollection, FeatureCollection, lineString, point} from "@turf/helpers";
import {Serialized} from "./types/Serialized";
import {Graph} from "./types/Graph";


interface ConversionSettings {
    /* Whether conversion should export cells centroids as markers. */
    exportCellsCentroids: boolean,

    /* Exported lineStrings' stroke-width ranges from 0 to maximumWidth, depending on their weight. */
    maximumWidth: number,

    /* Lines with a weight inferior to this are not exported. */
    minimalWeightLimit: number
}

const defaultConversionSettings: ConversionSettings = {
    exportCellsCentroids: false,
    maximumWidth: 10,
    minimalWeightLimit: -1
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

    // weight-filtering lines
    const filteredLinks = settings.minimalWeightLimit <= 0
        ? serializedGraph.links
        : serializedGraph.links.filter(link => link.weight >= settings.minimalWeightLimit);

    const lines = filteredLinks.map(link => {
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
