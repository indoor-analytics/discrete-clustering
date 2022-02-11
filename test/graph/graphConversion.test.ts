import {getPaths} from "../features/paths";
import {Shape} from "../../src/utils/Shape";
import {printCollectionToFile} from "../utils/printCollectionToFile";
import {convertGraphToFeatureCollection} from "../../src/graph/convertGraphToFeatureCollection";
import {clusterPaths, convertPolygonsToGraph} from "../../src";

describe('Graph conversion tests', () => {
    it ('should convert paths to graph containing some nodes', () => {
        const cells = clusterPaths(getPaths(), 100, Shape.Hexagon);
        const graph = convertPolygonsToGraph(cells);
        // @ts-ignore
        expect(graph.nodes().length).not.toEqual(0);
    });
});

describe ('Graph to FeatureCollection', () => {
    it ('should convert graph to featureCollection', () => {
        const cells = clusterPaths(getPaths(), 360, Shape.Hexagon);
        const graph = convertPolygonsToGraph(cells);
        const collection = convertGraphToFeatureCollection(graph);
        printCollectionToFile(collection, 'graph.json');
    });
});
