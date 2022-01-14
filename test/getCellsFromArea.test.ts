import { getCellsFromArea } from "../src/zones/getCellsFromArea";
import { trainStationZoneOfInterest } from "./features/zones";

describe ('Get cells from area', () => {
    it ('should return some cells', () => {
        const cells = getCellsFromArea(trainStationZoneOfInterest);
        expect(cells.features.length).toBeGreaterThan(0);
    });

    it ('should return more cells with an increased granularity', () => {
        const cells = getCellsFromArea(trainStationZoneOfInterest, 10);
        const cells2 = getCellsFromArea(trainStationZoneOfInterest, 20);
        expect(cells2.features.length).toBeGreaterThan(cells.features.length);
    });
});
