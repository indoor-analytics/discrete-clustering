import {Serialized} from "./Serialized";

export interface Graph {
    addNode: (node: NodeId) => Graph;
    removeNode: (node: NodeId) => Graph;
    nodes: () => NodeId[];
    adjacent: (node: NodeId) => NodeId[];
    addEdge: (u: NodeId, v: NodeId, weight?: number | undefined) => Graph;
    removeEdge: (u: NodeId, v: NodeId) => Graph;
    hasEdge: (u: NodeId, v: NodeId) => boolean;
    setEdgeWeight: (u: NodeId, v: NodeId, weight: EdgeWeight) => void;
    getEdgeWeight: (u: NodeId, v: NodeId) => EdgeWeight;
    indegree: (node: NodeId) => number;
    outdegree: (node: NodeId) => number;
    depthFirstSearch: (sourceNodes?: string[] | undefined, includeSourceNodes?: boolean, errorOnCycle?: boolean) => string[];
    hasCycle: () => boolean;
    lowestCommonAncestors: (node1: NodeId, node2: NodeId) => string[];
    topologicalSort: (sourceNodes?: string[] | undefined, includeSourceNodes?: boolean) => string[];
    shortestPath: (source: NodeId, destination: NodeId) => string[] & {
        weight?: number | undefined;
    };
    serialize: () => Serialized;
    deserialize: (serialized: Serialized) => Graph;
}
