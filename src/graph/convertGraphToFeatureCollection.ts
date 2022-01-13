import {Feature, featureCollection, FeatureCollection, lineString, point} from "@turf/helpers";
import Graph from "graphology";


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

    const features: Feature[] = [];

    if (settings.exportCellsCentroids)
        features.push(...graph.mapNodes((node) => {
            return point(node.split(',').map(c => +c))
        }));

    // looking for maximum weight
    let localMaximum = 0;
    graph.forEachEdge((_, attributes) => {
        if (attributes.weight > localMaximum)
            localMaximum = attributes.weight;
    });

    // weight-filtering lines
    const filteredLinks = settings.minimalWeightLimit <= 0
        ? graph.edges()
        : graph.filterEdges(edge => {
            return graph.getEdgeAttribute(edge, 'weight') >= settings.minimalWeightLimit;
        })

    const lines = filteredLinks.map(link => {
        const weight = graph.getEdgeAttribute(link, 'weight');
        const coordinates = link.split('/');
        return lineString(
            [
                coordinates[0].split(',').map(c => +c),
                coordinates[1].split(',').map(c => +c)
            ],
            {
                'stroke-width': (weight / localMaximum) * settings.maximumWidth,
                weight: weight
            }
        );
    });

    features.push(...lines);


    return featureCollection(features);
}
