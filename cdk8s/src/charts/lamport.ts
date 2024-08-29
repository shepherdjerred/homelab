import { App, Chart } from "https://esm.sh/cdk8s@2.68.58";
import { createEspHomeDeployment } from "../services/esphome.ts";
import { createInvidiousDeployment } from "../services/frontends/invidious.ts";
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
import { KubeNamespace } from "../../imports/k8s.ts";
import { createEarthlyDeployment } from "../services/dev/earthly.ts";
import { createMinecraftDeployment } from "../services/games/glitter-minecraft.ts";
import { createDdnsDeployment } from "../services/ddns.ts";
import { createValheimDeployment } from "../services/games/valheim.ts";
import { createUpgradePlan } from "../plan.ts";
import { createScryptedDeployment } from "../services/scrypted.ts";

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

  new KubeNamespace(chart, "glitter-boys-beta", {
    metadata: {
      name: "glitter-boys-beta",
    },
  });

  new KubeNamespace(chart, "glitter-boys-prod", {
    metadata: {
      name: "glitter-boys-prod",
    },
  });

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
  createBitmagnetDeployment(chart);
  createProwlarrDeployment(chart);
  createPalworldDeployment(chart);
  createEarthlyDeployment(chart);
  createMinecraftDeployment(chart);
  createDdnsDeployment(chart);
  createValheimDeployment(chart);
  createUpgradePlan(chart);
  createScryptedDeployment(chart);
}
