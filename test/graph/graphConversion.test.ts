import {getClusteredGraph} from "../../src/graph/main";
import {getPaths} from "../features/paths";
import {Shape} from "../../src/Shape";
import {printCollectionToFile} from "../utils/printCollectionToFile";
import {convertGraphToFeatureCollection} from "../../src/graph/convertGraphToFeatureCollection";

describe('Graph conversion tests', () => {
    it ('should convert paths to graph containing some nodes', () => {
        const graph = getClusteredGraph(getPaths(),
            100,
            Shape.Hexagon
        );
        // @ts-ignore
        expect(graph.nodes().length).not.toEqual(0);
    });
});

describe ('Graph to FeatureCollection', () => {
    it ('should convert graph to featureCollection', () => {
        const graph = getClusteredGraph(getPaths(),
            360,
            Shape.Hexagon
        );
        const collection = convertGraphToFeatureCollection(graph);
        printCollectionToFile(collection, 'graph.json');
    });
});
