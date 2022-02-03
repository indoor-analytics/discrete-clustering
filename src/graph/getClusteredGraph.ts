import {Feature, FeatureCollection, LineString, Polygon} from "@turf/helpers";
import {Shape} from "../utils/Shape";
import {convertPolygonsToGraph} from "./convertPolygonsToGraph";
import Graph from "graphology";
import { clusterPaths } from "..";

/**
 * This computes a graph whose edges have a weight representing number of paths
 * they represent.
 * 
 * @param paths input paths to cluster
 * @param granularity size of grid cells (increase this to reduce cells' size)
 * @param shape shape used to create grid cells
 * @returns weighted-edges graph
 */
export function getClusteredGraph(
    paths: Feature<LineString>[],
    granularity: number,
    shape = Shape.Square
): Graph {
    return convertPolygonsToGraph(
        clusterPaths(paths, granularity, shape, false) as FeatureCollection<Polygon, {weight: number}>
    );
}
