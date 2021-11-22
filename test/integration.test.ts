import {discreteClustering} from "../src";
import {trainStationZoneOfInterest} from "./features/zones";
import {getPaths} from "./features/paths";
import {printCollectionToFile} from "./utils/printCollectionToFile";

describe('Integration', () => {
    it ('should return some cells', () => {
        const cells = discreteClustering(
            trainStationZoneOfInterest,
            getPaths(),
            42
        );
        printCollectionToFile(cells);
    });
});
