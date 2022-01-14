import {getPaths} from "./features/paths";
import {printCollectionToFile} from "./utils/printCollectionToFile";
import {Shape} from "../src/Shape";
import {clusterPaths} from "../src/zones/clusterPaths";

describe('Integration', () => {
    it ('should return some cells', () => {
        console.time('clustering');
        const cells = clusterPaths(
            getPaths(),
            360,
            Shape.Hexagon
        );
        console.timeLog('clustering');
        printCollectionToFile(cells);
    });
});
