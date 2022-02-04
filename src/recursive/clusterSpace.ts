import { Feature, featureCollection, FeatureCollection, LineString, Polygon } from "@turf/helpers";
import { splitPolygon } from "./splitPolygon";

export function clusterSpace (
    _paths: FeatureCollection<LineString>,
    zone: Feature<Polygon>,
    targetDepth: number,
    currentDepth = 0
): FeatureCollection<Polygon, {weight: number}> {
    if (targetDepth < 1)
        throw new RangeError('Target depth must be superior to 0.');

    // TODO throw if there are paths outside zone
    // TODO if there are no paths, return empty collection

    // TODO mark zone with weight

    // end recursion if target depth has been reached
    if (currentDepth === targetDepth)
        return featureCollection([zone as Feature<Polygon, {weight: number}>]);


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
