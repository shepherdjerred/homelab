import { App } from "npm:cdk8s";
import { createTuringChart } from "./charts/turing.ts";
import { createGlitterBoysChart } from "./charts/glitter-boys.ts";

const app = new App();

createGlitterBoysChart(app, "beta");
createGlitterBoysChart(app, "prod");
createTuringChart(app);

app.synth();
