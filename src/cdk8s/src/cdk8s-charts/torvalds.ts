import { App, Chart } from "cdk8s";

// All services have been migrated to their own charts:
// - media: plex, sonarr, radarr, bazarr, qbittorrent, tautulli, overseerr, prowlarr, maintainerr, recyclarr, whisperbridge
// - home: homeassistant, ha
// - postal: postal, postal-mariadb
// - syncthing: syncthing
// - golink: golink, golink-sync
// - freshrss: freshrss
// - pokemon: pokemon
// - gickup: gickup
// - grafana-db: grafana postgresql database (deployed to prometheus namespace)
// - plausible: plausible, clickhouse, plausible-db (new namespace)
// - birmel: birmel discord bot (new namespace)
// - scout-frontend: scout-for-lol frontend (new namespace)
// - cloudflare-tunnel: cloudflare tunnel CRD (new namespace)
//
// The torvalds namespace is created by the apps chart (via createTorvaldsApp).
// This chart is kept for backwards compatibility with the existing ArgoCD Application.

export function createTorvaldsChart(app: App) {
  new Chart(app, "torvalds", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });
}
