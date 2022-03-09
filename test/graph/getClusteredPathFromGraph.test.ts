import {clusterPaths, convertPolygonsToGraph, Shape} from "../../src";
import {getPaths} from "../features/paths";
import {getClusteredPathFromGraph} from "../../src";
import {getEdgeNodesFromPaths} from "../../src/graph/getEdgeNodesFromPaths";
import {featureCollection} from "@turf/helpers";

describe('getClusteredPathFromGraph', () => {
    const paths = getPaths();

    it ('should return a path for all shapes', () => {
        for (const shape of [Shape.Square, Shape.Hexagon, Shape.Triangle]) {
            const cells = clusterPaths(paths, 60, shape);
            const testGraph = convertPolygonsToGraph(cells);
            const positions = getEdgeNodesFromPaths(testGraph, featureCollection(paths));

            const path = getClusteredPathFromGraph(
                testGraph,
                positions.start,
                positions.end
            );

            expect(path.geometry.coordinates.length).toBeGreaterThan(0);
        }
    });

    it ('should throw with a non-existing starting node', () => {
        const cells = clusterPaths(paths, 60, Shape.Triangle);
        const testGraph = convertPolygonsToGraph(cells);
        const positions = getEdgeNodesFromPaths(testGraph, featureCollection(paths));
        const getPath = () => getClusteredPathFromGraph(testGraph, 'hellothere', positions.end);
        expect(getPath).toThrow(new RangeError('"hellothere" is not a graph node.'));
    });

    it ('should throw with a non-existing ending node', () => {
        const cells = clusterPaths(paths, 60, Shape.Triangle);
        const testGraph = convertPolygonsToGraph(cells);
        const positions = getEdgeNodesFromPaths(testGraph, featureCollection(paths));
        const getPath = () => getClusteredPathFromGraph(testGraph, '56.254875963,3.14421442', positions.end);
        expect(getPath).toThrow(new RangeError('"56.254875963,3.14421442" is not a graph node.'));
    });
});
