import {Feature, FeatureCollection, lineString, LineString, Point} from "@turf/helpers";
import * as fs from "fs";

export function getPaths (): Feature<LineString>[] {
    const data = fs.readFileSync('test/features/runs.json', 'utf8');
    const features = JSON.parse(data) as FeatureCollection[];

    return features.map((feature) => {
        return lineString(feature.features.map((point) => {
            return (point as Feature<Point>).geometry.coordinates
        }))
    });
}