import {getPaths} from "../features/paths";
import {featureCollection} from "@turf/helpers";
import {clusterSpace} from "../../src/recursive/clusterSpace";
import {trainStationSquare} from "../features/zones";

describe('Cluster space', () => {
    const paths = featureCollection(getPaths());

    it ('should throw with target depth = 0', () => {
        const cluster = () => clusterSpace(paths, trainStationSquare, 0);
        expect(cluster).toThrow(new RangeError('Target depth must be superior to 0.'));
    });

    it ('should throw with target depth = -42', () => {
        const cluster = () => clusterSpace(paths, trainStationSquare, -42);
        expect(cluster).toThrow(new RangeError('Target depth must be superior to 0.'));
    });

    it ('should throw if current depth is superior to target depth', () => {
        const cluster = () => clusterSpace(paths, trainStationSquare, 5, 6);
        expect(cluster).toThrow(new RangeError('Current depth cannot be superior to target depth.'));
    });
});
