import { getCellsFromArea } from "../src/getCellsFromArea";
import { trainStationZoneOfInterest } from "./features/zones";

describe ('Get cells from area', () => {
    it ('should return some cells', () => {
        const cells = getCellsFromArea(trainStationZoneOfInterest);
        expect(cells.features.length).toBeGreaterThan(0);
    });
});
