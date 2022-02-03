import { polygon } from "@turf/helpers";
import { splitPolygon } from "../../src/recursive/splitPolygon";

describe ('Split polygon', () => {
    it ('should return 4 squares while splitting a square', () => {
        const sq = polygon([[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]]);
        const squares = splitPolygon(sq);
        expect(squares.features.length).toEqual(4);
    });
});