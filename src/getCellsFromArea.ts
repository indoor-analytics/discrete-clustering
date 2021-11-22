import bbox from "@turf/bbox";
import {Feature, FeatureCollection, Polygon} from "@turf/helpers";
import length from "@turf/length";
import squareGrid from "@turf/square-grid";
import {Shape} from "./Shape";

export function getCellsFromArea(zoneOfInterest: Feature<Polygon>, granularity = 42, shape: Shape = Shape.Square): FeatureCollection<Polygon> {
    const areaBbox = bbox(zoneOfInterest);
    const areaLength = length(zoneOfInterest);
    const cellSize = areaLength/granularity;
    switch (shape) {
    default:
        return squareGrid(areaBbox, cellSize, {units: "kilometers", mask: zoneOfInterest});
    }
}
