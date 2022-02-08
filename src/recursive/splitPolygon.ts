import centroid from "@turf/centroid";
import distance from "@turf/distance";
import { Feature, featureCollection, FeatureCollection, polygon, Polygon, Position } from "@turf/helpers";
import midpoint from "@turf/midpoint";

export function splitPolygon(
    iPolygon: Feature<Polygon>
): FeatureCollection<Polygon> {
    const vertexCount = iPolygon.geometry.coordinates[0].length;
    const subZones: Feature<Polygon>[] = [];

    // square
    if (vertexCount === 5) {
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

    // triangle
    else if (vertexCount === 4) {
        const coordinates = iPolygon.geometry.coordinates[0];
        const d1 = distance(coordinates[0], coordinates[1]);
        const d2 = distance(coordinates[1], coordinates[2]);
        const d3 = distance(coordinates[2], coordinates[3]);

        if (d1 > d2 && d1 > d3) {
            const middle = midpoint(coordinates[0], coordinates[1]);
            subZones.push(
                polygon([
                    [ coordinates[0], middle.geometry.coordinates, coordinates[2], coordinates[0] ]
                ]),
                polygon([
                    [ middle.geometry.coordinates, coordinates[1], coordinates[2], middle.geometry.coordinates ]
                ])
            );
        }

        else if (d2 > d1 && d2 > d3) {
            const middle = midpoint(coordinates[1], coordinates[2]);
            subZones.push(
                polygon([
                    [ coordinates[1], middle.geometry.coordinates, coordinates[3], coordinates[1] ]
                ]),
                polygon([
                    [ middle.geometry.coordinates, coordinates[2], coordinates[3], middle.geometry.coordinates ]
                ])
            );
        }

        else if (d3 > d1 && d3 > d2) {
            const middle = midpoint(coordinates[1], coordinates[2]);
            subZones.push(
                polygon([
                    [ coordinates[2], middle.geometry.coordinates, coordinates[1], coordinates[2] ]
                ]),
                polygon([
                    [ middle.geometry.coordinates, coordinates[3], coordinates[1], middle.geometry.coordinates ]
                ])
            );
        }

        else throw new Error("This shouldn't happen.");

        return featureCollection(subZones);
    }

    throw new Error('Cannot split this shape.');
}