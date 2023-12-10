import { App, Chart } from "npm:cdk8s";
import { createInvidiousDeployment } from "./resources/invidious.ts";
import { createTedditDeployment } from "./resources/teddit.ts";
import { createPlexDeployment } from "./resources/plex.ts";
import { createRadarrDeployment } from "./resources/radarr.ts";
import { createBazarrDeployment } from "./resources/bazarr.ts";
import { createHomeAssistantDeployment } from "./resources/homeassistant.ts";
import { createJackettDeployment } from "./resources/jackett.ts";
import { createNitterDeployment } from "./resources/nitter.ts";
import { createOverseerrDeployment } from "./resources/overseerr.ts";
import { createQBitTorrentDeployment } from "./resources/qbittorrent.ts";
import { createSonarrDeployment } from "./resources/sonarr.ts";
import { createSyncthingDeployment } from "./resources/syncthing.ts";
import { createTautulliDeployment } from "./resources/tautulli.ts";
import { createGolinkDeployment } from "./resources/golink.ts";
import { createBitmagnetDeployment } from "./resources/bitmagnet.ts";

const app = new App();
const chart = new Chart(app, "turing");

createInvidiousDeployment(chart);
createTedditDeployment(chart);
createPlexDeployment(chart);
createRadarrDeployment(chart);
createBazarrDeployment(chart);
createHomeAssistantDeployment(chart);
createJackettDeployment(chart);
createNitterDeployment(chart);
createOverseerrDeployment(chart);
createQBitTorrentDeployment(chart);
createSonarrDeployment(chart);
createSyncthingDeployment(chart);
createTautulliDeployment(chart);
createGolinkDeployment(chart);
createBitmagnetDeployment(chart);

app.synth();
