import { App, Chart, Size } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createTedditDeployment } from "../resources/frontends/teddit.ts";
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
import { createGrafanaPostgreSQLDatabase } from "../resources/postgres/grafana-db.ts";
import { createGickupDeployment } from "../resources/gickup.ts";
import { Redis } from "../resources/common/redis.ts";
import { createPeerTubePostgreSQLDatabase } from "../resources/postgres/peertube-db.ts";
import { createPeerTubeDeployment } from "../resources/media/peertube.ts";
import { RabbitMQ } from "../resources/common/rabbitmq.ts";
import { PostalMariaDB } from "../resources/postgres/postal-mariadb.ts";
import { createPostalDeployment } from "../resources/mail/postal.ts";

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
  createTedditDeployment(chart);
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
  createProwlarrDeployment(chart);
  createDdnsDeployment(chart);
  createMaintainerrDeployment(chart);
  createFreshRssDeployment(chart);
  createPokemonDeployment(chart);
  createHaDeployment(chart);
  createRecyclarrDeployment(chart);
  createGrafanaPostgreSQLDatabase(chart);
  await createGickupDeployment(chart);

  // PeerTube
  new Namespace(chart, "peertube-namespace", {
    metadata: {
      name: "peertube",
    },
  });
  const peertubeRedis = new Redis(chart, "peertube-redis", {
    namespace: "peertube",
  });
  createPeerTubePostgreSQLDatabase(chart);
  createPeerTubeDeployment(chart, { redis: peertubeRedis });

  // Postal
  new Namespace(chart, "postal-namespace", {
    metadata: {
      name: "postal",
      labels: {
        "pod-security.kubernetes.io/audit": "restricted",
      },
    },
  });
  const postalMariadb = new PostalMariaDB(chart, "postal-mariadb", {
    namespace: "postal",
    storageClass: "zfs-ssd",
    storageSize: "32Gi",
  });
  const postalRabbitmq = new RabbitMQ(chart, "postal-rabbitmq", {
    namespace: "postal",
    storageClass: "zfs-ssd",
    storageSize: "8Gi",
  });
  createPostalDeployment(chart, {
    mariadb: postalMariadb,
    rabbitmq: postalRabbitmq,
  });
}
