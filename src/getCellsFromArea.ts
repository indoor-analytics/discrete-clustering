import bbox from "@turf/bbox";
import {Feature, FeatureCollection, Polygon} from "@turf/helpers";
import length from "@turf/length";
import squareGrid from "@turf/square-grid";
import {Shape} from "./Shape";
import triangleGrid from "@turf/triangle-grid";
import hexGrid from "@turf/hex-grid";

/**
 * Transforms an area into a grid of cells.
 * 
 * @param zoneOfInterest polygon to split into cells
 * @param granularity cell size
 * @param shape cell shape 
 * @returns an ensemble of cells representing input zone of interest
 */
export function getCellsFromArea(zoneOfInterest: Feature<Polygon>, granularity = 42, shape: Shape = Shape.Square): FeatureCollection<Polygon> {
    const areaBbox = bbox(zoneOfInterest);
    const areaLength = length(zoneOfInterest);
    const cellSize = areaLength/granularity;
    const options = {mask: zoneOfInterest};

    switch (shape) {
    case Shape.Triangle:
        return triangleGrid(areaBbox, cellSize, options);
    case Shape.Hexagon:
        return hexGrid(areaBbox, cellSize, options);
    case Shape.Square:
        return squareGrid(areaBbox, cellSize, options);
    default:
        throw new RangeError('Cannot build cells with unknown shape.');
    }
}
