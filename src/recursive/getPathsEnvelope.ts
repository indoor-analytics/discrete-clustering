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

    // Fit paths
    if (shape === Shape.Fit) {
        return pathsEnvelope;
    }

    // Square or Triangle
    else if ([Shape.Square, Shape.Triangle].includes(shape)) {
        const center = centroid(pathsEnvelope);
        let maxDistance = 0;
        paths.features.forEach(path => path.geometry.coordinates.forEach(pos => {
            const dist = distance(pos, center);
            if (dist > maxDistance)
                maxDistance = dist;
        }));

        const square = bboxPolygon(bbox(circle(center, maxDistance)));
        if (shape === Shape.Square)
            return square;

        // We'll use square to build a triangle containing all paths
        const d1 = distance(square.geometry.coordinates[0][0], square.geometry.coordinates[0][1]);
        const d2 = distance(square.geometry.coordinates[0][0], square.geometry.coordinates[0][2]);

        // TODO create point by mirroring p0 over p1 (so that d(p0,n0) == 2*d1)
        // TODO create point by mirroring p0 over p2 (so that d(p0,n1) == 2*d2)

        // TODO return triangle
    }

    else {
        throw new Error('unimplemented');
    }
}
