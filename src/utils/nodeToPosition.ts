import {Position} from "@turf/helpers";


/**
 * Convenience method that converts a node string ("longitude/latitude")
 * into a Position ([longitude, latitude]).
 * @param node string to convert to position
 */
export function nodeToPosition(
    node: string
): Position {
    return node.split(',').map(c => +c);
}
