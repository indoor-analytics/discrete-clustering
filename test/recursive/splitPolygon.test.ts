import { polygon } from "@turf/helpers";
import area from "@turf/area";
import { splitPolygon } from "../../src/recursive/splitPolygon";

describe ('Split polygon', () => {
    it ('should return 4 squares while splitting a square', () => {
        const sq = polygon([[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]]);
        const squares = splitPolygon(sq);
        expect(squares.features.length).toEqual(4);
    });

    it ('should throw with hexagon', () => {
        const hexagon = polygon([[[
            2.3668456077575684,
            51.032137667738205
          ],
          [
            2.366276979446411,
            51.03173958137818
          ],
          [
            2.366856336593628,
            51.0313145023373
          ],
          [
            2.367875576019287,
            51.03133474428482
          ],
          [
            2.3684442043304443,
            51.03165861424241
          ],
          [
            2.3678863048553467,
            51.03213092054026
          ],
          [
            2.3668456077575684,
            51.032137667738205
          ]]]);
        
          const split = () => splitPolygon(hexagon);
          expect(split).toThrow(new Error('Cannot split this shape.'));
    });

    it ('should split a triangle in two identical triangles', () => {
      const triangle = polygon([
        [
          [
            2.2806930541992188,
            50.76947080994697
          ],
          [
            2.294125556945801,
            50.76947080994697
          ],
          [
            2.2806930541992188,
            50.777748226396255
          ],
          [
            2.2806930541992188,
            50.76947080994697
          ]
        ]
      ]);
      const triangles = splitPolygon(triangle);
      expect(triangles.features.length).toEqual(2);
      expect(area(triangles.features[0])).not.toEqual(0);
      expect(area(triangles.features[1])).not.toEqual(0);
    });
});