import {clusterPaths, convertPolygonsToGraph, Shape} from "../../src";
import {getPaths} from "../features/paths";
import {getClusteredPathFromGraph} from "../../src";
import {getEdgeNodesFromPaths} from "../../src/graph/getEdgeNodesFromPaths";
import {featureCollection} from "@turf/helpers";

describe('getClusteredPathFromGraph', () => {
    it ('should return a path for all shapes', () => {
        for (const shape of [Shape.Square, Shape.Hexagon, Shape.Triangle]) {
            const paths = getPaths();
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
});
