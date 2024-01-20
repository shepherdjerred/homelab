import { App, Chart } from "npm:cdk8s";
import { createInvidiousDeployment } from "./services/frontends/invidious.ts";
import { createTedditDeployment } from "./services/frontends/teddit.ts";
import { createPlexDeployment } from "./services/media/plex.ts";
import { createRadarrDeployment } from "./services/torrents/radarr.ts";
import { createHomeAssistantDeployment } from "./services/homeassistant.ts";
import { createNitterDeployment } from "./services/frontends/nitter.ts";
import { createOverseerrDeployment } from "./services/torrents/overseerr.ts";
import { createQBitTorrentDeployment } from "./services/torrents/qbittorrent.ts";
import { createSonarrDeployment } from "./services/torrents/sonarr.ts";
import { createSyncthingDeployment } from "./services/syncthing.ts";
import { createTautulliDeployment } from "./services/media/tautulli.ts";
import { createGolinkDeployment } from "./services/golink.ts";
import { createBitmagnetDeployment } from "./services/torrents/bitmagnet.ts";
import { createNvidiaResources } from "./nvidia.ts";
import { createOnePasswordApp } from "./apps/1password.ts";
import { createArgoCdApp } from "./apps/argocd.ts";
import { createDatadogApp } from "./apps/datadog.ts";
import { createLonghornApp } from "./apps/longhorn.ts";
import { createTailscaleApp } from "./apps/tailscale.ts";
import { createTuringApp } from "./apps/turing.ts";
import { createProject } from "./apps/project.ts";
import { createProwlarrDeployment } from "./services/torrents/prowlarr.ts";
import { createBazarrDeployment } from "./services/torrents/bazarr.ts";
import { createEspHomeDeployment } from "./services/esphome.ts";
import { createStashDeployment } from "./services/media/stash.ts";
import { createImmichApp } from "./apps/immich.ts";

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
createTailscaleApp(chart);
createTuringApp(chart);
createImmichApp(chart);

createEspHomeDeployment(chart);
createBazarrDeployment(chart);
createTautulliDeployment(chart);
createInvidiousDeployment(chart);
createTedditDeployment(chart);
createPlexDeployment(chart);
createRadarrDeployment(chart);
createHomeAssistantDeployment(chart);
createNitterDeployment(chart);
createOverseerrDeployment(chart);
createQBitTorrentDeployment(chart);
createSonarrDeployment(chart);
createSyncthingDeployment(chart);
createGolinkDeployment(chart);
createBitmagnetDeployment(chart);
createProwlarrDeployment(chart);
createStashDeployment(chart);

createNvidiaResources(chart);

app.synth();
