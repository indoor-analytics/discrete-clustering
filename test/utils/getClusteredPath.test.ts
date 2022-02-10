import {featureCollection, Position} from "@turf/helpers";
import {getPaths, getReferencePath} from "../features/paths";
import {getClusteredPath} from "../../src/utils/getClusteredPath";
import {Shape} from "../../src";

describe('getClusteredPath', () => {
    const paths = featureCollection(getPaths());
    const referencePath = getReferencePath();
    const startPos: Position = referencePath.geometry.coordinates[0];
    const endPos: Position = referencePath.geometry.coordinates[referencePath.geometry.coordinates.length-1];

    it ('should return a path with square shape', () => {
        const path = getClusteredPath(paths, startPos, endPos, {targetDepth: 5, shape: Shape.Square});
        expect(path.geometry.coordinates.length).not.toEqual(0);
    });
});
