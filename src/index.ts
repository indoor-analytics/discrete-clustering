import { convertPolygonsToGraph } from "./graph/convertPolygonsToGraph";
import { getClusteredPathFromGraph } from "./graph/getClusteredPathFromGraph";
import { clusterSpace } from "./recursive/clusterSpace";
import { Shape } from "./utils/Shape";
import { clusterPaths } from "./zones/clusterPaths";

/**
 * All methods exposed by the compiled library are exported here.
 */
export {clusterPaths, clusterSpace, convertPolygonsToGraph, getClusteredPathFromGraph, Shape};
