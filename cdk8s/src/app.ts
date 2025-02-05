import { App } from "cdk8s";
import { createLamportChart } from "./charts/lamport.ts";
import { createProjectChart } from "./charts/project.ts";
import { createAppsChart } from "./charts/apps.ts";
import { createScoutChart } from "./charts/scout.ts";

const app = new App();

createProjectChart(app);
createAppsChart(app);
createLamportChart(app);
createScoutChart(app, "beta");

app.synth();
