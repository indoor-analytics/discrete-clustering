import {getEdgeNodesFromPaths} from "../../src/graph/getEdgeNodesFromPaths";
import {getPaths} from "../features/paths";
import {clusterPaths, convertPolygonsToGraph, Shape} from "../../src";
import {featureCollection} from "@turf/helpers";

describe('getEdgeNodesFromPaths', () => {
    const paths = getPaths();
    const cells = clusterPaths(getPaths(), 60, Shape.Hexagon);
    const testGraph = convertPolygonsToGraph(cells);

    it ('should return a starting and an ending position', () => {
        const positions = getEdgeNodesFromPaths(testGraph, featureCollection(paths));
        expect(positions.start.length).toBeGreaterThan(0);
        expect(positions.end.length).toBeGreaterThan(0);
    });
});
