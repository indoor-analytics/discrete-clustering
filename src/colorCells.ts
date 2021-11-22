import {featureCollection, FeatureCollection, Polygon} from "@turf/helpers";

export function colorCells (
    cells: FeatureCollection<Polygon, {weight: number}>
): FeatureCollection<Polygon, {weight: number}> {
    let localMaximum = 0;

    // excluding cells that are not intersected by paths
    const localCells = featureCollection(cells.features.filter((cell) => {
        return cell.properties.weight !== undefined && cell.properties.weight > 0;
    }));

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
