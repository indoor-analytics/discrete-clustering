import centroid from "@turf/centroid";
import { Feature, featureCollection, FeatureCollection, polygon, Polygon, Position } from "@turf/helpers";

export function splitPolygon(
    iPolygon: Feature<Polygon>
): FeatureCollection<Polygon> {
    if (iPolygon.geometry.coordinates[0].length !== 5)
        throw new Error('Cannot split this shape.');

    const subZones: Feature<Polygon>[] = [];
    const boxCenter = centroid(iPolygon);

    for (let i=0; i<4; i++) {
        const boxVertex = iPolygon.geometry.coordinates[0][i];
        const newVertex1: Position = [boxCenter.geometry.coordinates[0], boxVertex[1]];
        const newVertex2: Position = [boxVertex[0], boxCenter.geometry.coordinates[1]];
        subZones.push(
            polygon(
                [ 
                    [ boxVertex, newVertex1, boxCenter.geometry.coordinates, newVertex2, boxVertex ]
                ]
            )
        );
    }

    return featureCollection(subZones);
}