import { App, Chart } from "cdk8s";
import { createInvidiousDeployment } from "./invidious.ts";
import { createTedditDeployment } from "./teddit.ts";
import { createPlexDeployment } from "./plex.ts";
import { createRadarrDeployment } from "./radarr.ts";
import { createBazarrDeployment } from "./bazarr.ts";
import { createHomeAssistantDeployment } from "./homeassistant.ts";
import { createJackettDeployment } from "./jackett.ts";
import { createNitterDeployment } from "./nitter.ts";
import { createOverseerrDeployment } from "./overseerr.ts";
import { createQBitTorrentDeployment } from "./qbittorrent.ts";
import { createSonarrDeployment } from "./sonarr.ts";
import { createSyncthingDeployment } from "./syncthing.ts";
import { createTautulliDeployment } from "./tautulli.ts";

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

app.synth();
