import squareGrid from "@turf/square-grid";
import {trainStationZoneOfInterest} from "./features/zones";
import bbox from "@turf/bbox";
import {markCellsWithPaths} from "../src/zones/markCellsWithPaths";
import {featureCollection, lineString} from "@turf/helpers";
import {getPaths} from "./features/paths";
import envelope from "@turf/envelope";
import {getCellsFromArea} from "../src/zones/getCellsFromArea";
import {Shape} from "../src";
import {printCollectionToFile} from "./utils/printCollectionToFile";

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

    it ('should not produce cell with no weight', () => {
        const allCells = markCellsWithPaths(cells, paths);
        for (const cell of allCells.features) {
            if (cell.properties?.weight === undefined)
                throw new Error("Cell has no weight.");
        }
    });

    it ('should retain cells covering all paths', () => {
        const paths = getPaths('topRuns.json');
        printCollectionToFile(featureCollection(paths), 'paths.json');
        const testZone = envelope(featureCollection(paths));
        const zoneCells = getCellsFromArea(testZone, 60, Shape.Hexagon);
        printCollectionToFile(zoneCells, 'pathsCells.json');

        const markedCells = markCellsWithPaths(zoneCells, paths);
        printCollectionToFile(markedCells, 'markedCells.json');
        expect(markedCells.features.length).toEqual(24);
    });
});
