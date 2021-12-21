import {getClusteredGraph} from "../../src/graph/main";
import {getPaths} from "../features/paths";
import {Shape} from "../../src/Shape";

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
