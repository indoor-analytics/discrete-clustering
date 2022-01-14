import {discreteClustering} from "../src/zones";
import {getPaths} from "./features/paths";
import {Shape} from "../src/Shape";

const runsCount = 10;
let durationsSum = 0;
console.log(`Benchmarking discreteClustering with ${runsCount} executions...\n`);

for (let i=0; i<runsCount; i++) {
    const beginTime = Date.now();
    discreteClustering(
        getPaths(),
        360,
        Shape.Hexagon
    );
    durationsSum += (Date.now() - beginTime);
    console.log(`[${new Date().toISOString()}] n°${i} finished`);
}

const average = durationsSum/runsCount;
console.log(`\nAverage clustering duration for ${runsCount} runs: `, `${average} ms`);
