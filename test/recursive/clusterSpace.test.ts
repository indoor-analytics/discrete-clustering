import {getPaths} from "../features/paths";
import {featureCollection} from "@turf/helpers";
import {clusterSpace} from "../../src/recursive/clusterSpace";
import {printCollectionToFile} from "../utils/printCollectionToFile";
import area from "@turf/area";
import {Shape} from "../../src";
import distance from "@turf/distance";

describe('Cluster space', () => {
    const paths = featureCollection(getPaths());

    it ('should throw with target depth = 0', () => {
        const cluster = () => clusterSpace(paths, 0);
        expect(cluster).toThrow(new RangeError('Target depth must be superior to 0.'));
    });

    it ('should throw with target depth = -42', () => {
        const cluster = () => clusterSpace(paths, -42);
        expect(cluster).toThrow(new RangeError('Target depth must be superior to 0.'));
    });

    it ('should return an empty collection with no input paths', () => {
        const result = clusterSpace(featureCollection([]), 2);
        expect(result.features.length).toEqual(0);
    });


    it ('should return smaller cells with increased depth', () => {
        const cells1 = clusterSpace(paths, 3);
        const cells2 = clusterSpace(paths, 4);
        expect(area(cells1.features[0])).toBeCloseTo(4 * area(cells2.features[0]));
        printCollectionToFile(cells1, 'recursiveCells.json');
    })

    it ('should return colored cells by default', () => {
        const cells = clusterSpace(paths, 5);
        expect(cells.features[0].properties).toHaveProperty('fill-opacity');
    });

    it ('should return cells without color', () => {
        const cells = clusterSpace(paths, 5, false);
        expect(cells.features[0].properties).not.toHaveProperty('fill-opacity');
    });


    it ('should return square cells', () => {
        const cells = clusterSpace(paths, 5, true, Shape.Square);
        const cell = cells.features[0];
        const d1 = distance(cell.geometry.coordinates[0][0], cell.geometry.coordinates[0][1]);
        const d2 = distance(cell.geometry.coordinates[0][1], cell.geometry.coordinates[0][2]);
        expect(d1).toBeCloseTo(d2);
    });

    it ('should return triangular cells', () => {
        const cells = clusterSpace(paths, 5, true, Shape.Triangle);
        const cell = cells.features[0];
        expect(cell.geometry.coordinates[0].length).toEqual(4);
        printCollectionToFile(cells, 'triangularCells.json');
    });
});
