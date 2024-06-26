import { App } from "https://esm.sh/cdk8s@2.68.58";
import { createLamportChart } from "./charts/lamport.ts";
import { createGlitterBoysChart } from "./charts/glitter-boys.ts";
import { createProjectChart } from "./charts/project.ts";
import { createAppsChart } from "./charts/apps.ts";
import { createImmichChart } from "./charts/immich.ts";

const app = new App();

createProjectChart(app);
createAppsChart(app);
createLamportChart(app);
createGlitterBoysChart(app, "beta");
createGlitterBoysChart(app, "prod");
createImmichChart(app);

app.synth();
