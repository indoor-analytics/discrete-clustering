export interface Serialized {
    nodes: {
        id: NodeId;
    }[];
    links: {
        source: NodeId;
        target: NodeId;
        weight: EdgeWeight;
    }[];
}
