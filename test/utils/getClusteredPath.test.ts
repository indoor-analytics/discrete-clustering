import {featureCollection} from "@turf/helpers";
import {getPaths} from "../features/paths";
import {getClusteredPath} from "../../src/utils/getClusteredPath";
import {Shape} from "../../src";

describe('getClusteredPath', () => {
    const paths = featureCollection(getPaths());

    it ('should return a path with square shape', () => {
        const path = getClusteredPath(paths, {targetDepth: 5, shape: Shape.Square});
        expect(path.geometry.coordinates.length).not.toEqual(0);
    });

    it ('should return a path with triangle shape', () => {
        const path = getClusteredPath(paths, {shape: Shape.Triangle});
        expect(path.geometry.coordinates.length).not.toEqual(0);
    });

    it ('should return a path with fit shape', () => {
        const path = getClusteredPath(paths, {shape: Shape.Fit});
        expect(path.geometry.coordinates.length).not.toEqual(0);
    });

    it ('should throw with hexagon shape', () => {
        const getPath = () => getClusteredPath(paths, {shape: Shape.Hexagon});
        expect(getPath).toThrow(new Error('This shape is not supported by this method.'));
    });

    it ('should produce more positions with increased depth', () => {
        const path1 = getClusteredPath(paths, {targetDepth: 5});
        const path2 = getClusteredPath(paths, {targetDepth: 6});
        expect(path1.geometry.coordinates.length).toBeLessThan(path2.geometry.coordinates.length)
    });
});
