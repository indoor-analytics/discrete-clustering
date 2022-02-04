import {getPaths} from "../features/paths";
import {featureCollection} from "@turf/helpers";
import {clusterSpace} from "../../src/recursive/clusterSpace";

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
});
