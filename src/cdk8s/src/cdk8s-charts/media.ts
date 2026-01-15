import { App, Chart, Size } from "cdk8s";
import { ZfsHddVolume } from "../misc/zfs-hdd-volume.ts";
import { createBazarrDeployment } from "../resources/torrents/bazarr.ts";
import { createTautulliDeployment } from "../resources/media/tautulli.ts";
import { createPlexDeployment } from "../resources/media/plex.ts";
import { createRadarrDeployment } from "../resources/torrents/radarr.ts";
import { createOverseerrDeployment } from "../resources/torrents/overseerr.ts";
import { createQBitTorrentDeployment } from "../resources/torrents/qbittorrent.ts";
import { createSonarrDeployment } from "../resources/torrents/sonarr.ts";
import { createProwlarrDeployment } from "../resources/torrents/prowlarr.ts";
import { createMaintainerrDeployment } from "../resources/torrents/maintainerr.ts";
import { createRecyclarrDeployment } from "../resources/torrents/recyclarr.ts";
import { createWhisperbridgeDeployment } from "../resources/torrents/whisperbridge.ts";

export function createMediaChart(app: App) {
  const chart = new Chart(app, "media", {
    namespace: "media",
    disableResourceNameHashes: true,
  });

  // Shared volumes for media stack
  const tvVolume = new ZfsHddVolume(chart, "plex-tv-hdd-pvc", {
    storage: Size.tebibytes(4),
  });
  const downloadsVolume = new ZfsHddVolume(chart, "qbittorrent-hdd-pvc", {
    storage: Size.tebibytes(1),
  });
  const moviesVolume = new ZfsHddVolume(chart, "plex-movies-hdd-pvc", {
    storage: Size.tebibytes(4),
  });

  // Media services that share volumes
  createBazarrDeployment(chart, {
    tv: tvVolume.claim,
    movies: moviesVolume.claim,
  });
  createTautulliDeployment(chart);
  createPlexDeployment(chart, {
    tv: tvVolume.claim,
    movies: moviesVolume.claim,
  });
  createRadarrDeployment(chart, {
    movies: moviesVolume.claim,
    downloads: downloadsVolume.claim,
  });
  createOverseerrDeployment(chart);
  createQBitTorrentDeployment(chart, {
    downloads: downloadsVolume.claim,
  });
  createSonarrDeployment(chart, {
    tv: tvVolume.claim,
    downloads: downloadsVolume.claim,
  });
  createProwlarrDeployment(chart);
  createMaintainerrDeployment(chart);
  createRecyclarrDeployment(chart);
  createWhisperbridgeDeployment(chart);
}
