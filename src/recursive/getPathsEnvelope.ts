import {Feature, FeatureCollection, LineString, Polygon} from "@turf/helpers";
import {Shape} from "../utils/Shape";
import envelope from "@turf/envelope";

export function getPathsEnvelope(
    paths: FeatureCollection<LineString>,
    _shape: Shape
): Feature<Polygon> {
    return envelope(paths);
}
