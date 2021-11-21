import bbox from "@turf/bbox";
import { Feature, FeatureCollection, Polygon } from "@turf/helpers";
import squareGrid from "@turf/square-grid";

export function getCellsFromArea(zoneOfInterest: Feature<Polygon>): FeatureCollection {
    const areaBbox = bbox(zoneOfInterest);
    const areaLength = 42; // TODO use @turf/length to get area length
    const cellSize = areaLength/12;
    return squareGrid(areaBbox, cellSize, {"units": "kilometers"});
}