import { App, Chart } from "cdk8s";
import { createInvidiousDeployment } from "./invidious.ts";
import { createTedditDeployment } from "./teddit.ts";
import { createPlexDeployment } from "./plex.ts";
import { createRadarrDeployment } from "./radarr.ts";

const app = new App();
const chart = new Chart(app, "jerred");

createInvidiousDeployment(chart);
createTedditDeployment(chart);
createPlexDeployment(chart);
createRadarrDeployment(chart);

app.synth();
