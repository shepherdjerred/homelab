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
import { createDatadogResources } from "./datadog.ts";
import { createLonghornResources } from "./longhorn.ts";
import { createNvidiaResources } from "./nvidia.ts";
import { createTailscaleResources } from "./tailscale.ts";
import { createOnePasswordApp } from "./apps/1password.ts";
import { createArgoCdApp } from "./apps/argocd.ts";
import { createDatadogApp } from "./apps/datadog.ts";
import { createLonghornApp } from "./apps/longhorn.ts";
import { createNvidiaApp } from "./apps/nvidia.ts";
import { createTailscaleApp } from "./apps/tailscale.ts";
import { createTuringApp } from "./apps/turing.ts";
import { createProject } from "./apps/project.ts";

const app = new App();
const chart = new Chart(app, "turing", {
  namespace: "turing",
  disableResourceNameHashes: true,
  labels: {
    "app.kubernetes.io/instance": "turing",
  },
});

createProject(chart);

createOnePasswordApp(chart);
createArgoCdApp(chart);
createDatadogApp(chart);
createLonghornApp(chart);
createNvidiaApp(chart);
createTailscaleApp(chart);
createTuringApp(chart);

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

createDatadogResources(chart);
createLonghornResources(chart);
createNvidiaResources(chart);
createTailscaleResources(chart);

app.synth();
