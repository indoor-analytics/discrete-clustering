import {getClusteredGraph, Shape} from "../../src";
import {getPaths, getReferencePath} from "../features/paths";
import {getClusteredPath} from "../../src/graph/getClusteredPath";

describe('getClusteredPath', () => {
    const testGraph = getClusteredGraph(getPaths(),
        360,
        Shape.Hexagon
    );
    const referencePath = getReferencePath();


    it ('should return a path', () => {
        const path = getClusteredPath(
            testGraph,
            referencePath.geometry.coordinates[0],
            referencePath.geometry.coordinates[referencePath.geometry.coordinates.length-1]
        );
        expect(path.geometry.coordinates.length).toBeGreaterThan(0);
    });

    it ('should return a path for all shapes', () => {
        for (const shape of [Shape.Square, Shape.Hexagon, Shape.Triangle]) {
            const testGraph = getClusteredGraph(getPaths(),
                60,
                shape
            );

            const path = getClusteredPath(
                testGraph,
                referencePath.geometry.coordinates[0],
                referencePath.geometry.coordinates[referencePath.geometry.coordinates.length-1]
            );

            expect(path.geometry.coordinates.length).toBeGreaterThan(0);
        }
    });
});
