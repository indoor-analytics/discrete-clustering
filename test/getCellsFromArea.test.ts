import { polygon } from "@turf/helpers";
import { getCellsFromArea } from "../src/getCellsFromArea";

describe ('Get cells from area', () => {
    it ('should return some cells', () => {
        const area = polygon([[[0, 1], [1, 1], [1, 0], [0, 0], [0, 1]]]);
        const cells = getCellsFromArea(area);
        expect(cells.features.length).toBeGreaterThan(0);
    });
});
