import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { Cpu, Deployment, DeploymentStrategy, EnvValue, Namespace, Protocol, Secret, Service } from "cdk8s-plus-31";
import { withCommonProps, ROOT_UID, ROOT_GID } from "../misc/common.ts";
import { TailscaleIngress } from "../misc/tailscale.ts";
import { OnePasswordItem } from "../../generated/imports/onepassword.com.ts";
import { KubePersistentVolumeClaim, Quantity } from "../../generated/imports/k8s.ts";
import { SSD_STORAGE_CLASS } from "../misc/storage-classes.ts";
import versions from "../versions.ts";

const NAMESPACE = "openhands";

export function createOpenHandsDeployment(chart: Chart) {
  // Create privileged namespace for DinD sidecar
  new Namespace(chart, "openhands-namespace", {
    metadata: {
      name: NAMESPACE,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  // 1Password secret for Anthropic API key
  const anthropicSecret = new OnePasswordItem(chart, "openhands-anthropic-secret", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/6eyxyiwsg7aqdfktuvwaifwjle",
    },
    metadata: {
      name: "openhands-anthropic",
      namespace: NAMESPACE,
    },
  });

  // PVC for OpenHands config/state (in openhands namespace)
  const configPvc = new KubePersistentVolumeClaim(chart, "openhands-config-pvc", {
    metadata: {
      name: "openhands-config-pvc",
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
          storage: Quantity.fromString("16Gi"),
        },
      },
    },
  });

  // PVC for Docker-in-Docker data (container images, layers) - in openhands namespace
  const dockerDataPvc = new KubePersistentVolumeClaim(chart, "openhands-docker-data-pvc", {
    metadata: {
      name: "openhands-docker-data-pvc",
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
          storage: Quantity.fromString("64Gi"),
        },
      },
    },
  });

  const deployment = new Deployment(chart, "openhands", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    metadata: {
      namespace: NAMESPACE,
    },
  });

  // Docker-in-Docker sidecar container
  deployment.addContainer(
    withCommonProps({
      name: "dind",
      image: `docker.io/library/docker:${versions["library/docker"]}`,
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        readOnlyRootFilesystem: false,
        privileged: true,
        allowPrivilegeEscalation: true,
      },
      args: ["dockerd", "--host=tcp://0.0.0.0:2375", "--tls=false"],
      ports: [
        {
          name: "docker",
          number: 2375,
          protocol: Protocol.TCP,
        },
      ],
      resources: {
        cpu: {
          request: Cpu.millis(500),
          limit: Cpu.millis(4000),
        },
        memory: {
          request: Size.gibibytes(1),
          limit: Size.gibibytes(8),
        },
      },
    }),
  );

  // OpenHands main container
  deployment.addContainer(
    withCommonProps({
      name: "openhands",
      image: `ghcr.io/all-hands-ai/openhands:${versions["all-hands-ai/openhands"]}`,
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        readOnlyRootFilesystem: false,
      },
      ports: [
        {
          name: "http",
          number: 3000,
          protocol: Protocol.TCP,
        },
      ],
      envVariables: {
        // Connect to DinD sidecar
        DOCKER_HOST: EnvValue.fromValue("tcp://localhost:2375"),
        // Sandbox runtime image
        SANDBOX_RUNTIME_CONTAINER_IMAGE: EnvValue.fromValue("docker.all-hands.dev/all-hands-ai/runtime:0.38-nikolaik"),
        // LLM configuration
        LLM_MODEL: EnvValue.fromValue("anthropic/claude-sonnet-4-20250514"),
        LLM_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "openhands-anthropic-k8s-secret", anthropicSecret.name),
          key: "anthropic-api-key",
        }),
        OPENAI_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "openhands-openai-k8s-secret", anthropicSecret.name),
          key: "openai-api-key",
        }),
      },
      resources: {
        cpu: {
          request: Cpu.millis(250),
          limit: Cpu.millis(2000),
        },
        memory: {
          request: Size.mebibytes(512),
          limit: Size.gibibytes(4),
        },
      },
    }),
  );

  // Add volumes and volume mounts via JsonPatch since PVCs are in a different namespace
  const deploymentApiObject = ApiObject.of(deployment);

  // Add volumes to pod spec
  deploymentApiObject.addJsonPatch(
    JsonPatch.add("/spec/template/spec/volumes", [
      {
        name: "docker-data",
        persistentVolumeClaim: {
          claimName: dockerDataPvc.name,
        },
      },
      {
        name: "openhands-config",
        persistentVolumeClaim: {
          claimName: configPvc.name,
        },
      },
    ]),
  );

  // Add volume mount to DinD container (first container, index 0)
  deploymentApiObject.addJsonPatch(
    JsonPatch.add("/spec/template/spec/containers/0/volumeMounts", [
      {
        name: "docker-data",
        mountPath: "/var/lib/docker",
      },
    ]),
  );

  // Add volume mount to OpenHands container (second container, index 1)
  deploymentApiObject.addJsonPatch(
    JsonPatch.add("/spec/template/spec/containers/1/volumeMounts", [
      {
        name: "openhands-config",
        mountPath: "/.openhands",
      },
    ]),
  );

  const service = new Service(chart, "openhands-service", {
    selector: deployment,
    ports: [{ port: 3000 }],
    metadata: {
      namespace: NAMESPACE,
    },
  });

  new TailscaleIngress(chart, "openhands-tailscale-ingress", {
    service,
    host: "openhands",
    funnel: false,
    metadata: {
      namespace: NAMESPACE,
    },
  });
}
