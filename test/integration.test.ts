import {discreteClustering} from "../src";
import {getPaths} from "./features/paths";
import {printCollectionToFile} from "./utils/printCollectionToFile";
import {Shape} from "../src/Shape";

describe('Integration', () => {
    it ('should return some cells', () => {
        const cells = discreteClustering(
            getPaths(),
            180,
            Shape.Hexagon
        );
        printCollectionToFile(cells);
    });
});
