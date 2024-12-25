import { App, Chart } from "cdk8s";
import { createEspHomeDeployment } from "../services/home/esphome.ts";
import { createInvidiousDeployment } from "../services/frontends/invidious.ts";
import { createTedditDeployment } from "../services/frontends/teddit.ts";
import { createGolinkDeployment } from "../services/golink.ts";
import { createHomeAssistantDeployment } from "../services/home/homeassistant.ts";
import { createPlexDeployment } from "../services/media/plex.ts";
import { createTautulliDeployment } from "../services/media/tautulli.ts";
import { createSyncthingDeployment } from "../services/syncthing.ts";
import { createBazarrDeployment } from "../services/torrents/bazarr.ts";
import { createOverseerrDeployment } from "../services/torrents/overseerr.ts";
import { createProwlarrDeployment } from "../services/torrents/prowlarr.ts";
import { createQBitTorrentDeployment } from "../services/torrents/qbittorrent.ts";
import { createRadarrDeployment } from "../services/torrents/radarr.ts";
import { createSonarrDeployment } from "../services/torrents/sonarr.ts";
import { KubeNamespace } from "../../imports/k8s.ts";
import { createEarthlyDeployment } from "../services/dev/earthly.ts";
import { createDdnsDeployment } from "../services/ddns.ts";
import { createUpgradePlan } from "../plan.ts";
import { createScryptedDeployment } from "../services/home/scrypted.ts";
import { createOtbrDeployment } from "../services/home/otbr.ts";
import { createMaintainerrDeployment } from "../services/torrents/maintainerr.ts";

export function createLamportChart(app: App) {
  const chart = new Chart(app, "lamport", {
    namespace: "lamport",
    disableResourceNameHashes: true,
  });

  new KubeNamespace(chart, "lamport", {
    metadata: {
      name: "lamport",
      annotations: {
        // https://volsync.readthedocs.io/en/stable/usage/permissionmodel.html#controlling-mover-permissions
        "volsync.backube/privileged-movers": "true",
      },
    },
  });

  // TODO: create one namespace/argocd app per service
  createEspHomeDeployment(chart);
  createBazarrDeployment(chart);
  createTautulliDeployment(chart);
  createInvidiousDeployment(chart);
  createTedditDeployment(chart);
  createPlexDeployment(chart);
  createRadarrDeployment(chart);
  createHomeAssistantDeployment(chart);
  createOverseerrDeployment(chart);
  createQBitTorrentDeployment(chart);
  createSonarrDeployment(chart);
  createSyncthingDeployment(chart);
  createGolinkDeployment(chart);
  createProwlarrDeployment(chart);
  createEarthlyDeployment(chart);
  createDdnsDeployment(chart);
  createUpgradePlan(chart);
  createScryptedDeployment(chart);
  createOtbrDeployment(chart);
  createMaintainerrDeployment(chart);
}
