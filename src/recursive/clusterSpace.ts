import { Feature, featureCollection, FeatureCollection, LineString, Polygon } from "@turf/helpers";
import { splitPolygon } from "./splitPolygon";
import clone from "@turf/clone";

export function clusterSpace (
    paths: FeatureCollection<LineString>,
    zone: Feature<Polygon>,
    targetDepth: number,
    currentDepth = 0
): FeatureCollection<Polygon, {weight: number}> {
    if (targetDepth < 1)
        throw new RangeError('Target depth must be superior to 0.');
    if (currentDepth > targetDepth)
        throw new RangeError('Current depth cannot be superior to target depth.');

    // if there are no input paths, return empty collection
    if (paths.features.length === 0)
        return featureCollection([]);


    // TODO throw if there are paths outside zone

    // mark zone with weight
    const newZone: Feature<Polygon, {weight: number}> = clone(zone);
    newZone.properties.weight = paths.features.length;

    // end recursion if target depth has been reached
    if (currentDepth === targetDepth)
        return featureCollection([newZone]);


    const subZones = splitPolygon(zone).features;
    const returnCells: Feature<Polygon, {weight: number}>[] = [];

    for (const subZone of subZones) {
        const subZonePaths: FeatureCollection<LineString> = featureCollection([]);   // TODO get subZone path segments
        returnCells.push(
            ...clusterSpace(
                subZonePaths,
                subZone,
                targetDepth,
                currentDepth + 1
            ).features
        );
    }

    return featureCollection(returnCells);
}
