import {discreteClustering} from "../src/zones";
import {getPaths} from "./features/paths";
import {printCollectionToFile} from "./utils/printCollectionToFile";
import {Shape} from "../src/Shape";

describe('Integration', () => {
    it ('should return some cells', () => {
        console.time('clustering');
        const cells = discreteClustering(
            getPaths(),
            360,
            Shape.Hexagon
        );
        console.timeLog('clustering');
        printCollectionToFile(cells);
    });
});
