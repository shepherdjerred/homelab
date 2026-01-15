import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createPokemonApp(chart: Chart) {
  return new Application(chart, "pokemon-app", {
    metadata: {
      name: "pokemon",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "pokemon",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "pokemon",
      },
      syncPolicy: {
        automated: {},
      },
    },
  });
}
