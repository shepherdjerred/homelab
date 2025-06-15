import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";
import { ZfsSsdVolume } from "../utils/zfsSsdVolume.ts";
import { Size } from "cdk8s";

export function createDaggerApp(chart: Chart) {
  new Namespace(chart, "dagger-namespace", {
    metadata: {
      name: "dagger",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  // Create a ZFS SSD PVC for Dagger data
  const dataPvc = new ZfsSsdVolume(chart, "dagger-data", {
    storage: Size.gibibytes(100),
  });

  new Application(chart, "dagger-app", {
    metadata: {
      name: "dagger",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://registry.dagger.io/dagger",
        chart: "dagger",
        targetRevision: versions["dagger-helm"],
        helm: {
          valuesObject: {
            persistentVolumeClaim: {
              enabled: true,
              storageClassName: dataPvc.claim.storageClassName,
              accessModes: dataPvc.claim.accessModes,
            },
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "dagger",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
