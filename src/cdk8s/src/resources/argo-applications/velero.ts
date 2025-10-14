import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import { Schedule } from "../../../generated/imports/velero.io.ts";
import versions from "../../versions.ts";
import { Namespace } from "cdk8s-plus-31";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import { KubeClusterRole, KubeClusterRoleBinding } from "../../../generated/imports/k8s.ts";
export function createVeleroApp(chart: Chart) {
  new Namespace(chart, `velero-namespace`, {
    metadata: {
      name: `velero`,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  // Grant Coder default ServiceAccount access to Velero resources
  new KubeClusterRole(chart, "velero-coder-access-role", {
    metadata: {
      name: "velero-coder-access",
    },
    rules: [
      {
        apiGroups: ["velero.io"],
        resources: ["backups", "restores", "schedules", "backupstoragelocations", "volumesnapshotlocations"],
        verbs: ["get", "list", "watch", "create", "delete", "patch", "update"],
      },
    ],
  });

  new KubeClusterRoleBinding(chart, "velero-coder-access-binding", {
    metadata: {
      name: "velero-coder-access-binding",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "velero-coder-access",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "default",
        namespace: "coder",
      },
    ],
  });

  // 1Password secret for cloud credentials (AWS/GCP/Azure)
  const cloudCredentials = new OnePasswordItem(chart, "velero-cloud-credentials-onepassword", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/7thelujgeruxxp2qdsrqe2wd7q",
    },
    metadata: {
      name: "cloud-credentials",
      namespace: "velero",
    },
  });

  // Every 6 hours backups - keep for 3 days (12 backups total) - FULL BACKUPS
  new Schedule(chart, "velero-backup-6hourly", {
    metadata: {
      name: "6hourly-backup",
      namespace: "velero",
    },
    spec: {
      schedule: "15 */6 * * *", // Every 6 hours at minute 15 (12:15, 6:15, 12:15, 18:15)
      template: {
        snapshotVolumes: true,
        labelSelector: {
          matchLabels: {
            "velero.io/backup": "enabled",
          },
        },
        storageLocation: "default",
        ttl: "72h", // 3 days retention (12 backups total)
        metadata: {
          labels: {
            "backup-type": "6hourly",
          },
        },
      },
    },
  });

  // Every 3 days backups - keep 72 backups (216 days ~7 months) - FULL BACKUPS
  new Schedule(chart, "velero-backup-3daily", {
    metadata: {
      name: "3daily-backup",
      namespace: "velero",
    },
    spec: {
      schedule: "30 2 */3 * *", // Every 3 days at 2:30 AM (avoid hourly conflict)
      template: {
        snapshotVolumes: true,
        labelSelector: {
          matchLabels: {
            "velero.io/backup": "enabled",
          },
        },
        storageLocation: "default",
        ttl: "5184h", // 216 days retention (72 backups * 3 days)
        metadata: {
          labels: {
            "backup-type": "3daily",
          },
        },
      },
    },
  });

  // Weekly backups - keep 7 backups (7 weeks ~2 months) - FULL BACKUPS
  new Schedule(chart, "velero-backup-weekly", {
    metadata: {
      name: "weekly-backup",
      namespace: "velero",
    },
    spec: {
      schedule: "45 3 * * 1", // Every Monday at 3:45 AM (avoid Sunday conflicts)
      template: {
        snapshotVolumes: true,
        labelSelector: {
          matchLabels: {
            "velero.io/backup": "enabled",
          },
        },
        storageLocation: "default",
        ttl: "1176h", // 49 days retention (7 weeks)
        metadata: {
          labels: {
            "backup-type": "weekly",
          },
        },
      },
    },
  });

  // Monthly backups - keep 4 backups (4 months) - FULL BACKUPS
  new Schedule(chart, "velero-backup-monthly", {
    metadata: {
      name: "monthly-backup",
      namespace: "velero",
    },
    spec: {
      schedule: "0 5 2 * *", // 2nd day of month at 5:00 AM (avoid 1st day conflicts)
      template: {
        snapshotVolumes: true,
        labelSelector: {
          matchLabels: {
            "velero.io/backup": "enabled",
          },
        },
        storageLocation: "default",
        ttl: "2880h", // 120 days retention (4 months)
        metadata: {
          labels: {
            "backup-type": "monthly",
          },
        },
      },
    },
  });

  // Quarterly backups - keep 1 backup (3 months) - FULL BACKUPS
  new Schedule(chart, "velero-backup-quarterly", {
    metadata: {
      name: "quarterly-backup",
      namespace: "velero",
    },
    spec: {
      schedule: "30 7 3 */3 *", // 3rd day of every 3rd month at 7:30 AM (avoid 6:15 conflict)
      template: {
        snapshotVolumes: true,
        labelSelector: {
          matchLabels: {
            "velero.io/backup": "enabled",
          },
        },
        storageLocation: "default",
        ttl: "2160h", // 90 days retention (3 months)
        metadata: {
          labels: {
            "backup-type": "quarterly",
          },
        },
      },
    },
  });

  const veleroValues: HelmValuesForChart<"velero"> = {
    // Velero configuration
    metrics: {
      serviceMonitor: {
        enabled: true,
        additionalLabels: {
          release: "prometheus",
        },
      },
    },
    configuration: {
      backupStorageLocation: [
        {
          name: "default",
          bucket: "homelab",
          default: true,
          provider: "aws",
          prefix: "torvalds/backups/",
          config: {
            region: "auto", // Cloudflare R2 uses "auto" region
            s3Url: "https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com",
          },
        },
      ],
      volumeSnapshotLocation: [
        {
          name: "zfspv-incr",
          provider: "openebs.io/zfspv-blockstore",
          config: {
            bucket: "homelab",
            incrBackupCount: "15", // number of incremental backups we want to have
            fullBackupPrefix: "zfspv-full",
            backupPathPrefix: "zfspv-incr",
            namespace: "openebs",
            provider: "aws",
            region: "auto",
            s3Url: "https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com",
            prefix: "torvalds/zfs/",
            multiPartChunkSize: Size.mebibytes(20).asString(),
          },
        },
      ],
    },
    credentials: {
      existingSecret: cloudCredentials.name,
    },
    kubectl: {
      image: {
        repository: "registry.k8s.io/kubectl",
        tag: "v1.34.1",
      },
    },
    initContainers: [
      {
        name: "velero-plugin-for-aws",
        image: `velero/velero-plugin-for-aws:${versions["velero/velero-plugin-for-aws"]}`,
        volumeMounts: [
          {
            mountPath: "/target",
            name: "plugins",
          },
        ],
      },
      {
        name: "velero-plugin-openebs",
        image: `openebs/velero-plugin:${versions["openebs/velero-plugin"]}`,
        volumeMounts: [
          {
            mountPath: "/target",
            name: "plugins",
          },
        ],
      },
    ],
  };

  return new Application(chart, "velero-app", {
    metadata: {
      name: "velero",
    },
    spec: {
      project: "default",
      source: {
        // https://vmware-tanzu.github.io/helm-charts/
        repoUrl: "https://vmware-tanzu.github.io/helm-charts",
        chart: "velero",
        targetRevision: versions.velero,
        helm: {
          releaseName: "velero",
          valuesObject: veleroValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "velero",
      },
      syncPolicy: {
        automated: {
          prune: true,
          selfHeal: true,
        },
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
