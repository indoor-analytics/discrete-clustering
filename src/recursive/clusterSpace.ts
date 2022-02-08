import { Feature, featureCollection, FeatureCollection, LineString, Polygon } from "@turf/helpers";
import { splitPolygon } from "./splitPolygon";
import clone from "@turf/clone";
import lineIntersect from "@turf/line-intersect";
import {colorCells} from "../zones/colorCells";
import {Shape} from "../utils/Shape";
import {getPathsEnvelope} from "./getPathsEnvelope";

export function clusterSpace (
    paths: FeatureCollection<LineString>,
    targetDepth: number,
    shouldColorCells = true,
    shape: Shape = Shape.Fit
): FeatureCollection<Polygon, {weight: number}> {
    if (targetDepth < 1)
        throw new RangeError('Target depth must be superior to 0.');

    // TODO throw if there are paths outside zone

    const markedCells = _computeZones(paths, getPathsEnvelope(paths, shape), targetDepth);
    return shouldColorCells
        ? colorCells(markedCells)
        : markedCells;
}

function _computeZones(
    paths: FeatureCollection<LineString>,
    zone: Feature<Polygon>,
    targetDepth: number,
    currentDepth = 0
): FeatureCollection<Polygon, {weight: number}> {

    // if there are no input paths, return empty collection
    if (paths.features.length === 0)
        return featureCollection([]);

    // mark zone with weight
    const newZone: Feature<Polygon, {weight: number}> = clone(zone);
    newZone.properties.weight = paths.features.length;

    // end recursion if target depth has been reached
    if (currentDepth === targetDepth)
        return featureCollection([newZone as Feature<Polygon, {weight: number}>]);

    const subZones = splitPolygon(zone).features;
    const returnCells: Feature<Polygon, {weight: number}>[] = [];

    for (const subZone of subZones) {
        const subZonePaths: FeatureCollection<LineString> = featureCollection(paths.features.filter(path => lineIntersect(path, subZone).features.length !== 0));
        returnCells.push(
            ..._computeZones(
                subZonePaths,
                subZone,
                targetDepth,
                currentDepth + 1
            ).features
        );
    }

    return featureCollection(returnCells);
}
