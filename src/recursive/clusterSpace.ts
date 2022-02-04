import { Feature, featureCollection, FeatureCollection, LineString, Polygon } from "@turf/helpers";
import { splitPolygon } from "./splitPolygon";
import clone from "@turf/clone";
import envelope from "@turf/envelope";

export function clusterSpace (
    paths: FeatureCollection<LineString>,
    targetDepth: number
): FeatureCollection<Polygon, {weight: number}> {
    if (targetDepth < 1)
        throw new RangeError('Target depth must be superior to 0.');

    // TODO throw if there are paths outside zone

    return _computeZones(paths, envelope(paths), targetDepth);
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
        const subZonePaths: FeatureCollection<LineString> = paths;   // TODO get subZone path segments
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
