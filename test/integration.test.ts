import {discreteClustering} from "../src";
import {trainStationZoneOfInterest} from "./features/zones";
import {getPaths} from "./features/paths";
import {printCollectionToFile} from "./utils/printCollectionToFile";
import {Shape} from "../src/Shape";

describe('Integration', () => {
    it ('should return some cells', () => {
        const cells = discreteClustering(
            trainStationZoneOfInterest,
            getPaths(),
            720,
            Shape.Hexagon
        );
        printCollectionToFile(cells);
    });
});
