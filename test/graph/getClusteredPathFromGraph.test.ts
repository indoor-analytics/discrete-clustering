import {clusterPaths, convertPolygonsToGraph, Shape} from "../../src";
import {getPaths, getReferencePath} from "../features/paths";
import {getClusteredPathFromGraph} from "../../src";

describe('getClusteredPathFromGraph', () => {
    const referencePath = getReferencePath();

    it ('should return a path for all shapes', () => {
        for (const shape of [Shape.Square, Shape.Hexagon, Shape.Triangle]) {
            const cells = clusterPaths(getPaths(), 60, shape);
            const testGraph = convertPolygonsToGraph(cells);

            const path = getClusteredPathFromGraph(
                testGraph,
                referencePath.geometry.coordinates[0],
                referencePath.geometry.coordinates[referencePath.geometry.coordinates.length-1]
            );

            expect(path.geometry.coordinates.length).toBeGreaterThan(0);
        }
    });
});
