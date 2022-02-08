import {clusterPaths, clusterSpace} from "../src";
import {getPaths} from "./features/paths";
import {Shape} from "../src";
import { featureCollection } from "@turf/helpers";

const paths = featureCollection(getPaths());
const runsCount = 10;
let durationsSum = 0;
console.log(`Benchmarking discrete clustering with ${runsCount} executions...\n`);

// clusterPaths method
for (let i=0; i<runsCount; i++) {
    const beginTime = Date.now();
    clusterPaths(
        paths.features,
        360,
        Shape.Hexagon
    );
    durationsSum += (Date.now() - beginTime);
    console.log(`[${new Date().toISOString()}] n°${i} finished`);
}

const average1 = durationsSum/runsCount;
console.log(`\nAverage clustering duration for ${runsCount} runs (clusterPaths method): `, `${average1} ms`);

// clusterSpace method
durationsSum = 0;
for (let i=0; i<runsCount; i++) {
    const beginTime = Date.now();
    clusterSpace(
        paths,
        6,
        false,
        Shape.Square
    );
    durationsSum += (Date.now() - beginTime);
    console.log(`[${new Date().toISOString()}] n°${i} finished`);
}

const average2 = durationsSum/runsCount;
console.log(`\nAverage clustering duration for ${runsCount} runs (clusterSpace method): `, `${average2} ms`);