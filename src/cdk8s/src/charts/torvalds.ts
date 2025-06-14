import { App, Chart, Size } from "cdk8s";
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
import { createEarthlyDeployment } from "../services/dev/earthly.ts";
import { createDdnsDeployment } from "../services/ddns.ts";
import { createMaintainerrDeployment } from "../services/torrents/maintainerr.ts";
import { createStashDeployment } from "../services/media/stash.ts";
import { createFreshRssDeployment } from "../services/freshrss.ts";
import { createPokemonDeployment } from "../services/pokemon.ts";
import { createHaDeployment } from "../services/home/ha.ts";
import { ZfsHddVolume } from "../utils/zfsHddVolume.ts";

export function createTorvaldsChart(app: App) {
  const chart = new Chart(app, "torvalds", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  const tvVolume = new ZfsHddVolume(chart, "plex-tv-hdd-pvc", {
    storage: Size.tebibytes(2),
  });
  const downloadsVolume = new ZfsHddVolume(chart, "qbittorrent-hdd-pvc", {
    storage: Size.tebibytes(1),
  });
  const moviesVolume = new ZfsHddVolume(chart, "plex-movies-hdd-pvc", {
    storage: Size.tebibytes(9),
  });

  // TODO: create one namespace/argocd app per service
  createBazarrDeployment(chart, {
    tv: tvVolume.claim,
    movies: moviesVolume.claim,
  });
  createTautulliDeployment(chart);
  createTedditDeployment(chart);
  createPlexDeployment(chart, {
    tv: tvVolume.claim,
    movies: moviesVolume.claim,
  });
  createRadarrDeployment(chart, {
    movies: moviesVolume.claim,
    downloads: downloadsVolume.claim,
  });
  createHomeAssistantDeployment(chart);
  createOverseerrDeployment(chart);
  createQBitTorrentDeployment(chart, {
    downloads: downloadsVolume.claim,
  });
  createSonarrDeployment(chart, {
    tv: tvVolume.claim,
    downloads: downloadsVolume.claim,
  });
  createSyncthingDeployment(chart);
  createGolinkDeployment(chart);
  createProwlarrDeployment(chart);
  createEarthlyDeployment(chart);
  createDdnsDeployment(chart);
  createMaintainerrDeployment(chart);
  createStashDeployment(chart);
  createFreshRssDeployment(chart);
  createPokemonDeployment(chart);
  createHaDeployment(chart);
}
