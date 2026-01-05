import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createPlausiblePostgreSQLDatabase } from "../resources/postgres/plausible-db.ts";
import { createClickHouseDeployment } from "../resources/analytics/clickhouse.ts";
import { createPlausibleDeployment } from "../resources/analytics/plausible.ts";

export function createPlausibleChart(app: App) {
  const chart = new Chart(app, "plausible", {
    namespace: "plausible",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "plausible-namespace", {
    metadata: {
      name: "plausible",
    },
  });

  createPlausiblePostgreSQLDatabase(chart);
  const clickhouse = createClickHouseDeployment(chart);
  createPlausibleDeployment(chart, { clickhouseService: clickhouse.service });
}
