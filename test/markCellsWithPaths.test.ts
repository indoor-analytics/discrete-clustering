import squareGrid from "@turf/square-grid";
import {trainStationZoneOfInterest} from "./features/zones";
import bbox from "@turf/bbox";
import {markCellsWithPaths} from "../src/markCellsWithPaths";
import {featureCollection, lineString} from "@turf/helpers";

const cells = squareGrid(bbox(trainStationZoneOfInterest), 10);

describe('Mark cells with paths', () => {
    it ('should throw with empty paths array', () => {
        const markCells = () => markCellsWithPaths(cells, []);
        expect(markCells).toThrowError(new RangeError('Paths array must not be empty.'))
    });

    it ('should throw with empty cells collection', () => {
        const markCells = () => markCellsWithPaths(featureCollection([]), [lineString([[0, 1], [0, 2]])]);
        expect(markCells).toThrowError(new RangeError('Cells collection must not be empty.'))
    });
});
