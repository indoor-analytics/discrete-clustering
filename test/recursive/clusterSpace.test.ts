import {getPaths} from "../features/paths";
import {featureCollection} from "@turf/helpers";
import {clusterSpace} from "../../src/recursive/clusterSpace";
import {printCollectionToFile} from "../utils/printCollectionToFile";

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


    it ('should return more cells with increased depth', () => {
        const cells1 = clusterSpace(paths, 3);
        const cells2 = clusterSpace(paths, 4);
        expect(cells2.features.length).toEqual(4 * cells1.features.length);
        printCollectionToFile(cells1, 'recursiveCells.json');
    })
});
