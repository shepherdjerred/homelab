import { Chart, JsonPatch, Size } from "cdk8s";
import { ApiObject } from "cdk8s";
import { Cpu, Deployment, DeploymentStrategy, EnvValue, Namespace, Protocol, Service } from "cdk8s-plus-31";
import { withCommonProps, ROOT_UID, ROOT_GID } from "../misc/common.ts";
import { TailscaleIngress } from "../misc/tailscale.ts";
import { KubePersistentVolumeClaim, Quantity } from "../../generated/imports/k8s.ts";
import { SSD_STORAGE_CLASS } from "../misc/storage-classes.ts";
import versions from "../versions.ts";

const NAMESPACE = "claudecodeui";

export function createClaudeCodeUIDeployment(chart: Chart) {
  // Create namespace
  new Namespace(chart, "claudecodeui-namespace", {
    metadata: {
      name: NAMESPACE,
    },
  });

  // PVC for database (SQLite)
  const dbPvc = new KubePersistentVolumeClaim(chart, "claudecodeui-db-pvc", {
    metadata: {
      name: "claudecodeui-db-pvc",
      namespace: NAMESPACE,
      labels: {
        "velero.io/backup": "enabled",
        "velero.io/exclude-from-backup": "false",
      },
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: SSD_STORAGE_CLASS,
      volumeMode: "Filesystem",
      resources: {
        requests: {
          storage: Quantity.fromString("1Gi"),
        },
      },
    },
  });

  // PVC for Claude Code projects
  const projectsPvc = new KubePersistentVolumeClaim(chart, "claudecodeui-projects-pvc", {
    metadata: {
      name: "claudecodeui-projects-pvc",
      namespace: NAMESPACE,
      labels: {
        "velero.io/backup": "enabled",
        "velero.io/exclude-from-backup": "false",
      },
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: SSD_STORAGE_CLASS,
      volumeMode: "Filesystem",
      resources: {
        requests: {
          storage: Quantity.fromString("10Gi"),
        },
      },
    },
  });

  const deployment = new Deployment(chart, "claudecodeui", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    metadata: {
      namespace: NAMESPACE,
    },
  });

  // ClaudeCodeUI container
  deployment.addContainer(
    withCommonProps({
      name: "claudecodeui",
      image: `ghcr.io/shepherdjerred/claudecodeui:${versions["shepherdjerred/claudecodeui"]}`,
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        readOnlyRootFilesystem: false,
      },
      ports: [
        {
          name: "http",
          number: 3001,
          protocol: Protocol.TCP,
        },
      ],
      envVariables: {
        DATABASE_PATH: EnvValue.fromValue("/data/db/claudecodeui.db"),
        PORT: EnvValue.fromValue("3001"),
        NODE_ENV: EnvValue.fromValue("production"),
      },
      resources: {
        cpu: {
          request: Cpu.millis(100),
          limit: Cpu.millis(500),
        },
        memory: {
          request: Size.mebibytes(256),
          limit: Size.mebibytes(512),
        },
      },
    }),
  );

  // Add volumes and volume mounts via JsonPatch
  const deploymentApiObject = ApiObject.of(deployment);

  // Add volumes to pod spec
  deploymentApiObject.addJsonPatch(
    JsonPatch.add("/spec/template/spec/volumes", [
      {
        name: "db-data",
        persistentVolumeClaim: {
          claimName: dbPvc.name,
        },
      },
      {
        name: "projects-data",
        persistentVolumeClaim: {
          claimName: projectsPvc.name,
        },
      },
    ]),
  );

  // Add volume mounts to container (index 0)
  deploymentApiObject.addJsonPatch(
    JsonPatch.add("/spec/template/spec/containers/0/volumeMounts", [
      {
        name: "db-data",
        mountPath: "/data/db",
      },
      {
        name: "projects-data",
        mountPath: "/data/projects",
      },
    ]),
  );

  const service = new Service(chart, "claudecodeui-service", {
    selector: deployment,
    ports: [{ port: 3001 }],
    metadata: {
      namespace: NAMESPACE,
    },
  });

  new TailscaleIngress(chart, "claudecodeui-tailscale-ingress", {
    service,
    host: "claudecodeui",
    funnel: false,
    metadata: {
      namespace: NAMESPACE,
    },
  });
}
