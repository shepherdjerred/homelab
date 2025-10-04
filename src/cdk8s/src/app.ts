import { App } from "cdk8s";
import { createTorvaldsChart } from "./cdk8s-charts/torvalds.ts";
import { createProjectChart } from "./cdk8s-charts/project.ts";
import { createAppsChart } from "./cdk8s-charts/apps.ts";
import { createScoutChart } from "./cdk8s-charts/scout.ts";

const app = new App();

createProjectChart(app);
await createAppsChart(app);
await createTorvaldsChart(app);
createScoutChart(app, "beta");

app.synth();
