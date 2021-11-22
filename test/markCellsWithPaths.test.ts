import squareGrid from "@turf/square-grid";
import {trainStationZoneOfInterest} from "./features/zones";
import bbox from "@turf/bbox";
import {markCellsWithPaths} from "../src/markCellsWithPaths";

const cells = squareGrid(bbox(trainStationZoneOfInterest), 10);

describe('Mark cells with paths', () => {
    it ('should throw with empty paths array', () => {
        const markCells = () => markCellsWithPaths(cells, []);
        expect(markCells).toThrowError(new RangeError('Paths array must not be empty.'))
    });
});
