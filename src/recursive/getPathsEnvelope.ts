import {Feature, FeatureCollection, LineString, polygon, Polygon} from "@turf/helpers";
import {Shape} from "../utils/Shape";
import envelope from "@turf/envelope";
import centroid from "@turf/centroid";
import distance from "@turf/distance";
import bbox from "@turf/bbox";
import circle from "@turf/circle";
import bboxPolygon from "@turf/bbox-polygon";
import destination from "@turf/destination";
import bearing from "@turf/bearing";

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
        const coordinates = square.geometry.coordinates[0];
        const d1 = distance(coordinates[0], coordinates[1]);
        const d2 = distance(coordinates[0], coordinates[3]);

        const newPosition0 = destination(coordinates[0], 2*d1, bearing(coordinates[0], coordinates[1])).geometry.coordinates;
        const newPosition1 = destination(coordinates[0], 2*d2, bearing(coordinates[0], coordinates[3])).geometry.coordinates;

        return polygon([
            [
                coordinates[0], newPosition0, newPosition1, coordinates[0] 
            ]
        ]);
    }

    else {
        throw new Error('unimplemented');
    }
}
