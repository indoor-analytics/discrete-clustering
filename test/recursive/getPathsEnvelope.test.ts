import {getPathsEnvelope} from "../../src/recursive/getPathsEnvelope";
import {Feature, featureCollection, lineString, Polygon} from "@turf/helpers";
import {getPaths} from "../features/paths";
import {Shape} from "../../src";
import area from "@turf/area";
import lineDistance = require("@turf/line-distance");
import { printCollectionToFile } from '../utils/printCollectionToFile';
import booleanWithin from '@turf/boolean-within';

describe('getPathsEnvelope', () => {
    const paths = featureCollection(getPaths());

    function checkEnvelope(envelope: Feature<Polygon>) {
        for (const path of paths.features)
            expect(booleanWithin(path, envelope)).toBeTruthy();
    }

    it ('should return a rectangular envelope', () => {
        const envelope = getPathsEnvelope(paths, Shape.Fit);
        expect(area(envelope)).not.toEqual(0);
        expect(envelope.geometry.coordinates[0].length).toEqual(5);
        const line1 = lineString([envelope.geometry.coordinates[0][0], envelope.geometry.coordinates[0][1]]);
        const line2 = lineString([envelope.geometry.coordinates[0][1], envelope.geometry.coordinates[0][2]]);
        expect(lineDistance(line1)).not.toEqual(lineDistance(line2));
        checkEnvelope(envelope);
    });

    it ('should return a square envelope', () => {
        const envelope = getPathsEnvelope(paths, Shape.Square);
        expect(area(envelope)).not.toEqual(0);
        expect(envelope.geometry.coordinates[0].length).toEqual(5);
        const line1 = lineString([envelope.geometry.coordinates[0][0], envelope.geometry.coordinates[0][1]]);
        const line2 = lineString([envelope.geometry.coordinates[0][1], envelope.geometry.coordinates[0][2]]);
        expect(lineDistance(line1)).toBeCloseTo(lineDistance(line2));
        checkEnvelope(envelope);
    });

    it ('should return a square envelope (2)', () => {
        const envelope = getPathsEnvelope(featureCollection(getPaths('topRuns.json')), Shape.Square);
        expect(area(envelope)).not.toEqual(0);
        expect(envelope.geometry.coordinates[0].length).toEqual(5);
        const line1 = lineString([envelope.geometry.coordinates[0][0], envelope.geometry.coordinates[0][1]]);
        const line2 = lineString([envelope.geometry.coordinates[0][1], envelope.geometry.coordinates[0][2]]);
        expect(lineDistance(line1)).toBeCloseTo(lineDistance(line2));
        checkEnvelope(envelope);
    });

    it ('should return a triangle envelope', () => {
        const envelope = getPathsEnvelope(paths, Shape.Triangle);
        expect(area(envelope)).not.toEqual(0);
        expect(envelope.geometry.coordinates[0].length).toEqual(4);
        printCollectionToFile(featureCollection([envelope]), 'triangleTest.json');
        checkEnvelope(envelope);
    });
});
