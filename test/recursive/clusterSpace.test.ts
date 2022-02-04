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
});
