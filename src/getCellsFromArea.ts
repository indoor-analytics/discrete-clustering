import bbox from "@turf/bbox";
import { Feature, FeatureCollection, Polygon } from "@turf/helpers";
import length from "@turf/length";
import squareGrid from "@turf/square-grid";

export function getCellsFromArea(zoneOfInterest: Feature<Polygon>, granularity = 42): FeatureCollection<Polygon> {
    const areaBbox = bbox(zoneOfInterest);
    const areaLength = length(zoneOfInterest);
    const cellSize = areaLength/granularity;
    return squareGrid(areaBbox, cellSize, {"units": "kilometers"});
}
