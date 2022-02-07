import {Feature, FeatureCollection, LineString, Polygon} from "@turf/helpers";
import {Shape} from "../utils/Shape";
import envelope from "@turf/envelope";
import centroid from "@turf/centroid";
import distance from "@turf/distance";
import bbox from "@turf/bbox";
import circle from "@turf/circle";
import bboxPolygon from "@turf/bbox-polygon";

export function getPathsEnvelope(
    paths: FeatureCollection<LineString>,
    shape: Shape
): Feature<Polygon> {
    const pathsEnvelope = envelope(paths);

    if (shape === Shape.Fit) {
        return pathsEnvelope;
    } else if (shape === Shape.Square) {
        const center = centroid(pathsEnvelope);
        let maxDistance = 0;
        paths.features.forEach(path => path.geometry.coordinates.forEach(pos => {
            const dist = distance(pos, center);
            if (dist > maxDistance)
                maxDistance = dist;
        }));
        return bboxPolygon(bbox(circle(center, maxDistance)));
    } else {
        throw new Error('unimplemented');
    }
}
