import { App } from "cdk8s";
import { createTorvaldsChart } from "./charts/torvalds.ts";
import { createProjectChart } from "./charts/project.ts";
import { createAppsChart } from "./charts/apps.ts";
import { createScoutChart } from "./charts/scout.ts";

const app = new App();

createProjectChart(app);
createAppsChart(app);
createTorvaldsChart(app);
createScoutChart(app, "beta");

app.synth();
