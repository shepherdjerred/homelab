import { App, Chart } from "npm:cdk8s";
import { createOnePasswordApp } from "../apps/1password.ts";
import { createArgoCdApp } from "../apps/argocd.ts";
import { createDatadogApp } from "../apps/datadog.ts";
import { createImmichApp } from "../apps/immich.ts";
import { createLonghornApp } from "../apps/longhorn.ts";
import { createProject } from "../apps/project.ts";
import { createTailscaleApp } from "../apps/tailscale.ts";
import { createTuringApp } from "../apps/turing.ts";
import { createLonghornResources } from "../longhorn.ts";
import { createNvidiaResources } from "../nvidia.ts";
import { createEspHomeDeployment } from "../services/esphome.ts";
import { createInvidiousDeployment } from "../services/frontends/invidious.ts";
import { createNitterDeployment } from "../services/frontends/nitter.ts";
import { createTedditDeployment } from "../services/frontends/teddit.ts";
import { createPalworldDeployment } from "../services/games/palworld.ts";
import { createGolinkDeployment } from "../services/golink.ts";
import { createHomeAssistantDeployment } from "../services/homeassistant.ts";
import { createPlexDeployment } from "../services/media/plex.ts";
import { createTautulliDeployment } from "../services/media/tautulli.ts";
import { createSyncthingDeployment } from "../services/syncthing.ts";
import { createBazarrDeployment } from "../services/torrents/bazarr.ts";
import { createBitmagnetDeployment } from "../services/torrents/bitmagnet.ts";
import { createOverseerrDeployment } from "../services/torrents/overseerr.ts";
import { createProwlarrDeployment } from "../services/torrents/prowlarr.ts";
import { createQBitTorrentDeployment } from "../services/torrents/qbittorrent.ts";
import { createRadarrDeployment } from "../services/torrents/radarr.ts";
import { createSonarrDeployment } from "../services/torrents/sonarr.ts";

export function createTuringChart(app: App) {
  const chart = new Chart(app, "turing", {
    namespace: "turing",
    disableResourceNameHashes: true,
    labels: {
      "app.kubernetes.io/instance": "turing",
    },
  });

  createProject(chart);

  createNvidiaResources(chart);
  createLonghornResources(chart);

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
  createPalworldDeployment(chart);
}
