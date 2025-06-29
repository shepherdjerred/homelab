import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { Schedule } from "../../imports/velero.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";

export function createVeleroApp(chart: Chart) {
  new Namespace(chart, `velero-namespace`, {
    metadata: {
      name: `velero`,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  // 1Password secret for cloud credentials (AWS/GCP/Azure)
  const cloudCredentials = new OnePasswordItem(
    chart,
    "velero-cloud-credentials-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/7thelujgeruxxp2qdsrqe2wd7q",
      },
      metadata: {
        name: "cloud-credentials",
        namespace: "velero",
      },
    }
  );

  new Schedule(chart, "velero-backup-schedule", {
    metadata: {
      name: "schd",
      namespace: "velero",
    },
    spec: {
      schedule: "0 * * * *", // Every hour (at minute 0)
      template: {
        snapshotVolumes: true,
        labelSelector: {
          matchLabels: {
            "velero.io/backup": "enabled",
          },
        },
        volumeSnapshotLocations: ["zfspv-incr"],
        storageLocation: "default",
        // Velero natively does not support the incremental backup,
        // so while taking the incremental backup we have to set the appropriate ttl for the backups so that we have
        // full incremental backup group available for restore. For example, in the above case we creating a schedule to take the backup
        // at every 1 hour and VolumeSnapshotLocation says we should keep 15 incremental backups then ttl should be set to 1 hour * (15 incr + 1 full) = 16 hours
        // or more. So that the full backup and all the incremental backups are available for the restore. If we don't set the ttl correctly
        // and full backup gets deleted, we won't be able use that backup, so we should make sure that correct ttl is set for the incremental backups schedule.
        ttl: "48h", // 48 hours retention (16h minimum + buffer)
      },
    },
  });

  new Application(chart, "velero-app", {
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
          valuesObject: {
            // Velero configuration
            configuration: {
              backupStorageLocation: [
                {
                  name: "default",
                  bucket: "homelab",
                  default: true,
                  provider: "aws",
                  config: {
                    region: "auto", // Cloudflare R2 uses "auto" region
                    s3Url:
                      "https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com",
                    s3ForcePathStyle: "true",
                  },
                },
              ],
              volumeSnapshotLocation: [
                {
                  name: "zfspv-incr",
                  provider: "openebs.io/zfspv-blockstore",
                  config: {
                    bucket: "homelab",
                    prefix: "zfs",
                    incrBackupCount: "15", // number of incremental backups we want to have
                    namespace: "openebs", // this is the namespace where ZFS-LocalPV creates all the CRs
                    provider: "aws",
                    region: "auto", // Cloudflare R2 uses "auto" region
                    s3ForcePathStyle: "true",
                    s3Url:
                      "https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com",
                  },
                },
              ],
            },
            // Credentials management
            credentials: {
              useSecret: true,
              existingSecret: cloudCredentials.name,
            },
            // Init containers for plugins
            initContainers: [
              {
                name: "velero-plugin-for-aws",
                image: `velero/velero-plugin-for-aws:${versions["velero/velero-plugin-for-aws"]}`,
                imagePullPolicy: "IfNotPresent",
                volumeMounts: [
                  {
                    mountPath: "/target",
                    name: "plugins",
                  },
                ],
              },
              {
                name: "velero-plugin-for-openebs",
                image: `openebs/velero-plugin:${versions["openebs/velero-plugin"]}`,
                imagePullPolicy: "IfNotPresent",
                volumeMounts: [
                  {
                    mountPath: "/target",
                    name: "plugins",
                  },
                ],
              },
            ],
          },
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
