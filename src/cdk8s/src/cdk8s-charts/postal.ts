import { App, Chart } from "cdk8s";
import { PostalMariaDB } from "../resources/postgres/postal-mariadb.ts";
import { createPostalDeployment } from "../resources/mail/postal.ts";

export function createPostalChart(app: App) {
  const chart = new Chart(app, "postal", {
    namespace: "postal",
    disableResourceNameHashes: true,
  });

  const postalMariadb = new PostalMariaDB(chart, "postal-mariadb", {
    namespace: "postal",
    storageClass: "zfs-ssd",
    storageSize: "32Gi",
  });

  createPostalDeployment(chart, {
    mariadb: postalMariadb,
  });
}
