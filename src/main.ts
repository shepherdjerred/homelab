import { App, Chart } from "https://esm.sh/cdk8s@2.64.25";
import { createCloudflareDdns } from "./containers/cloudflare-ddns/index.ts";

const app = new App();
const chart = new Chart(app, "sjerred");

createCloudflareDdns(chart);

app.synth();
