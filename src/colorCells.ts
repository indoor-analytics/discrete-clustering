import {FeatureCollection, Polygon} from "@turf/helpers";
import clone from "@turf/clone";


/**
 * Attributes a fill-opacity value to each cell regarding their
 * weight.
 * The heavier the cell, the stronger its opacity (maximum being 1).
 * 
 * @param cells input cells to color
 * @returns colored cells
 */
export function colorCells (
    cells: FeatureCollection<Polygon, {weight: number}>
): FeatureCollection<Polygon, {weight: number}> {
    let localMaximum = 0;
    const localCells = clone(cells);

    // looking for maximum weight
    for (const cell of localCells.features)
        if (cell.properties.weight > localMaximum)
            localMaximum = cell.properties.weight;

    // computing fill-opacity regarding weight
    for (const cell of localCells.features) {
        // @ts-ignore
        cell.properties['fill-opacity'] = cell.properties.weight / localMaximum;
    }

    return localCells;
}
