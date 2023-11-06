import { App, Chart } from "cdk8s";
import { createInvidiousDeployment } from "./invidious.ts";
import { createTedditDeployment } from "./teddit.ts";

const app = new App();
const chart = new Chart(app, "jerred");

createInvidiousDeployment(chart);
createTedditDeployment(chart);

app.synth();
