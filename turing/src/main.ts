import { App, Chart } from "npm:cdk8s";
import { createInvidiousDeployment } from "./services/frontends/invidious.ts";
import { createTedditDeployment } from "./services/frontends/teddit.ts";
import { createPlexDeployment } from "./services/media/plex.ts";
import { createRadarrDeployment } from "./services/torrents/radarr.ts";
import { createBazarrDeployment } from "./services/torrents/bazarr.ts";
import { createHomeAssistantDeployment } from "./services/homeassistant.ts";
import { createJackettDeployment } from "./services/torrents/jackett.ts";
import { createNitterDeployment } from "./services/frontends/nitter.ts";
import { createOverseerrDeployment } from "./services/torrents/overseerr.ts";
import { createQBitTorrentDeployment } from "./services/torrents/qbittorrent.ts";
import { createSonarrDeployment } from "./services/torrents/sonarr.ts";
import { createSyncthingDeployment } from "./services/syncthing.ts";
import { createTautulliDeployment } from "./services/media/tautulli.ts";
import { createGolinkDeployment } from "./services/golink.ts";
import { createBitmagnetDeployment } from "./services/torrents/bitmagnet.ts";

const app = new App();
const chart = new Chart(app, "turing", { namespace: "turing" });

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
