import { App } from "npm:cdk8s";
import { createTuringChart } from "./turing/chart.ts";

const app = new App();

createTuringChart(app);

app.synth();
