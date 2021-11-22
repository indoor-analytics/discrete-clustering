import squareGrid from "@turf/square-grid";
import {trainStationZoneOfInterest} from "./features/zones";
import bbox from "@turf/bbox";
import {markCellsWithPaths} from "../src/markCellsWithPaths";
import {featureCollection, lineString} from "@turf/helpers";
import {getPaths} from "./features/paths";

const cells = squareGrid(bbox(trainStationZoneOfInterest), 0.1);
const paths = getPaths();

describe('Mark cells with paths', () => {
    it ('should throw with empty paths array', () => {
        const markCells = () => markCellsWithPaths(cells, []);
        expect(markCells).toThrowError(new RangeError('Paths array must not be empty.'))
    });

    it ('should throw with empty cells collection', () => {
        const markCells = () => markCellsWithPaths(featureCollection([]), [lineString([[0, 1], [0, 2]])]);
        expect(markCells).toThrowError(new RangeError('Cells collection must not be empty.'))
    });

    it ('should mark some cells', () => {
        const allCells = markCellsWithPaths(cells, paths);
        const markedCells = allCells.features.filter((cell) => cell.properties?.weight !== undefined);
        expect(markedCells.length).not.toEqual(0);
    });

    it ('all cells should not have same weight', () => {
        const allCells = markCellsWithPaths(cells, paths);
        const weightsMap: Record<number, number> = {};
        for (const cell of allCells.features) {
            if (weightsMap[cell.properties?.weight] === undefined)
                weightsMap[cell.properties?.weight] = 1;
            else
                weightsMap[cell.properties?.weight] += 1;
        }
        expect(Object.keys(weightsMap).length).not.toEqual(1);
    });
});
