import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { Namespace } from "cdk8s-plus-31";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createKnativeOperatorApp(chart: Chart) {
  new Namespace(chart, `knative-operator-namespace`, {
    metadata: {
      name: `knative-operator`,
    },
  });

  const knativeOperatorValues: HelmValuesForChart<"knative-operator"> = {
    knative_operator: {
      knative_operator: {
        resources: {
          requests: {
            cpu: "50m",
            memory: "64Mi",
          },
          limits: {
            cpu: "500m",
            memory: "256Mi",
          },
        },
      },
      operator_webhook: {
        resources: {
          requests: {
            cpu: "50m",
            memory: "64Mi",
          },
          limits: {
            cpu: "250m",
            memory: "256Mi",
          },
        },
      },
    },
  };

  return new Application(chart, "knative-operator-app", {
    metadata: {
      name: "knative-operator",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://knative.github.io/operator",
        targetRevision: versions["knative-operator"],
        chart: "knative-operator",
        helm: {
          valuesObject: knativeOperatorValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "knative-operator",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
