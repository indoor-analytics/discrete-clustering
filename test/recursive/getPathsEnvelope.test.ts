import {getPathsEnvelope} from "../../src/recursive/getPathsEnvelope";
import {featureCollection, lineString} from "@turf/helpers";
import {getPaths} from "../features/paths";
import {Shape} from "../../src";
import area from "@turf/area";
import lineDistance = require("@turf/line-distance");

describe('getPathsEnvelope', () => {
    it ('should return a rectangular envelope', () => {
        const envelope = getPathsEnvelope(featureCollection(getPaths()), Shape.Fit);
        expect(area(envelope)).not.toEqual(0);
        expect(envelope.geometry.coordinates[0].length).toEqual(5);
        const line1 = lineString([envelope.geometry.coordinates[0][0], envelope.geometry.coordinates[0][1]]);
        const line2 = lineString([envelope.geometry.coordinates[0][1], envelope.geometry.coordinates[0][2]]);
        expect(lineDistance(line1)).not.toEqual(lineDistance(line2));
    })
});
