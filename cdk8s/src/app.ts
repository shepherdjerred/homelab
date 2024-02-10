import { App } from "npm:cdk8s";
import { createLamportChart } from "./charts/lamport.ts";
import { createGlitterBoysChart } from "./charts/glitter-boys.ts";
import { createCoreChart } from "./charts/core.ts";
import { createProjectChart } from "./charts/project.ts";
import { createAppsChart } from "./charts/apps.ts";

const app = new App();

createGlitterBoysChart(app, "beta");
createGlitterBoysChart(app, "prod");
createLamportChart(app);
createCoreChart(app);
createProjectChart(app);
createAppsChart(app);

app.synth();
