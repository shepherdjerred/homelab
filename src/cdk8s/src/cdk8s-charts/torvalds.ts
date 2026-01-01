import { App, Chart, Size } from "cdk8s";
import { createRedlibDeployment } from "../resources/frontends/redlib.ts";
import { createSjerRedDeployment } from "../resources/frontends/sjer-red.ts";
import { createScoutForLolFrontendDeployment } from "../resources/frontends/scout-for-lol.ts";
import { createWebringDocsDeployment } from "../resources/frontends/webring.ts";
import { createDppDocsDeployment } from "../resources/frontends/dpp-docs.ts";
import { createBetterSkillCappedDeployment } from "../resources/frontends/better-skill-capped.ts";
import { createGolinkDeployment } from "../resources/golink.ts";
import { createHomeAssistantDeployment } from "../resources/home/homeassistant.ts";
import { createPlexDeployment } from "../resources/media/plex.ts";
import { createTautulliDeployment } from "../resources/media/tautulli.ts";
import { createSyncthingDeployment } from "../resources/syncthing.ts";
import { createBazarrDeployment } from "../resources/torrents/bazarr.ts";
import { createOverseerrDeployment } from "../resources/torrents/overseerr.ts";
import { createProwlarrDeployment } from "../resources/torrents/prowlarr.ts";
import { createQBitTorrentDeployment } from "../resources/torrents/qbittorrent.ts";
import { createRadarrDeployment } from "../resources/torrents/radarr.ts";
import { createSonarrDeployment } from "../resources/torrents/sonarr.ts";
import { createDdnsDeployment } from "../resources/ddns.ts";
import { createMaintainerrDeployment } from "../resources/torrents/maintainerr.ts";
import { createFreshRssDeployment } from "../resources/freshrss.ts";
import { createPokemonDeployment } from "../resources/pokemon.ts";
import { createHaDeployment } from "../resources/home/ha.ts";
import { ZfsHddVolume } from "../misc/zfs-hdd-volume.ts";
import { createRecyclarrDeployment } from "../resources/torrents/recyclarr.ts";
import { createWhisperbridgeDeployment } from "../resources/torrents/whisperbridge.ts";
import { createGrafanaPostgreSQLDatabase } from "../resources/postgres/grafana-db.ts";
import { createGickupDeployment } from "../resources/gickup.ts";
import { Redis } from "../resources/common/redis.ts";
import { createPeerTubePostgreSQLDatabase } from "../resources/postgres/peertube-db.ts";
import { createPeerTubeDeployment } from "../resources/media/peertube.ts";
import { PostalMariaDB } from "../resources/postgres/postal-mariadb.ts";
import { createPostalDeployment } from "../resources/mail/postal.ts";
import { createGolinkSyncJob } from "../resources/golink-sync.ts";
import { createBirmelDeployment } from "../resources/birmel/index.ts";
import { createCloudflareTunnelCRD } from "../resources/cloudflare-tunnel.ts";
import { createPlausiblePostgreSQLDatabase } from "../resources/postgres/plausible-db.ts";
import { createClickHouseDeployment } from "../resources/analytics/clickhouse.ts";
import { createPlausibleDeployment } from "../resources/analytics/plausible.ts";

export async function createTorvaldsChart(app: App) {
  const chart = new Chart(app, "torvalds", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  const tvVolume = new ZfsHddVolume(chart, "plex-tv-hdd-pvc", {
    storage: Size.tebibytes(4),
  });
  const downloadsVolume = new ZfsHddVolume(chart, "qbittorrent-hdd-pvc", {
    storage: Size.tebibytes(1),
  });
  const moviesVolume = new ZfsHddVolume(chart, "plex-movies-hdd-pvc", {
    storage: Size.tebibytes(4),
  });

  // TODO: create one namespace/argocd app per service
  createBazarrDeployment(chart, {
    tv: tvVolume.claim,
    movies: moviesVolume.claim,
  });
  createTautulliDeployment(chart);
  createRedlibDeployment(chart);
  createPlexDeployment(chart, {
    tv: tvVolume.claim,
    movies: moviesVolume.claim,
  });
  createRadarrDeployment(chart, {
    movies: moviesVolume.claim,
    downloads: downloadsVolume.claim,
  });
  await createHomeAssistantDeployment(chart);
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
  createGolinkSyncJob(chart);
  createProwlarrDeployment(chart);
  createDdnsDeployment(chart);
  createMaintainerrDeployment(chart);
  createFreshRssDeployment(chart);
  createPokemonDeployment(chart);
  createHaDeployment(chart);
  createRecyclarrDeployment(chart);
  createWhisperbridgeDeployment(chart);
  createGrafanaPostgreSQLDatabase(chart);
  await createGickupDeployment(chart);

  // PeerTube
  const peertubeRedis = new Redis(chart, "peertube-redis", {
    namespace: "torvalds",
  });
  createPeerTubePostgreSQLDatabase(chart);
  createPeerTubeDeployment(chart, { redis: peertubeRedis });

  // Postal (all components in torvalds namespace)
  // Note: Postal v3 removed RabbitMQ dependency
  const postalMariadb = new PostalMariaDB(chart, "postal-mariadb", {
    namespace: "torvalds",
    storageClass: "zfs-ssd",
    storageSize: "32Gi",
  });
  createPostalDeployment(chart, {
    mariadb: postalMariadb,
  });

  // Birmel Discord bot
  createBirmelDeployment(chart);

  // Cloudflare Tunnel for public site access
  createCloudflareTunnelCRD(chart);

  // Public static sites (via Cloudflare Tunnel)
  createSjerRedDeployment(chart);
  createScoutForLolFrontendDeployment(chart);
  createWebringDocsDeployment(chart);
  createDppDocsDeployment(chart);
  createBetterSkillCappedDeployment(chart);

  // Plausible Analytics
  createPlausiblePostgreSQLDatabase(chart);
  const clickhouse = createClickHouseDeployment(chart);
  createPlausibleDeployment(chart, { clickhouseService: clickhouse.service });
}
