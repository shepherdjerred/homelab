import { Construct } from "https://esm.sh/constructs@10.3.0";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import {
  Deployment,
  DeploymentStrategy,
  EmptyDirMedium,
  EnvValue,
  ISecret,
  Secret,
  Service,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { withCommonProps } from "../../utils/common.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import versions from "../../versions/versions.ts";

export class Postgres extends Construct {
  public readonly passwordItem: OnePasswordItem;
  public readonly passwordSecret: ISecret;
  public readonly passwordEnvValue: EnvValue;
  public readonly deployment: Deployment;
  public readonly localPathVolume: LocalPathVolume;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: {
    itemPath: string;
    database: string;
    walTmpfs?: boolean;
  }) {
    super(scope, name);

    const UID = 1000;
    const GID = 1000;

    this.passwordItem = new OnePasswordItem(scope, `${name}-onepassword`, {
      spec: {
        itemPath: props.itemPath,
      },
      metadata: {
        name: `${name}-onepassword`,
      },
    });

    this.deployment = new Deployment(scope, `${name}-deployment`, {
      replicas: 1,
      strategy: DeploymentStrategy.recreate(),
      securityContext: {
        fsGroup: GID,
      },
    });

    this.passwordSecret = Secret.fromSecretName(
      scope,
      `${name}-password`,
      this.passwordItem.name,
    );

    this.passwordEnvValue = EnvValue.fromSecretValue({
      secret: this.passwordSecret,
      key: "password",
    });

    this.localPathVolume = new LocalPathVolume(
      scope,
      `${name}-volume`,
      {},
    );

    const volumeMounts = [
      {
        path: "/var/lib/postgresql/data",
        volume: Volume.fromPersistentVolumeClaim(
          scope,
          `${name}-pvc`,
          this.localPathVolume.claim,
        ),
      },
    ];

    if (props.walTmpfs) {
      volumeMounts.push({
        path: "/var/lib/postgresql/data/pgdata/pg_wal",
        volume: Volume.fromEmptyDir(
          scope,
          `${name}-wal-tmpfs`,
          `${name}-wal-tmpfs`,
          {
            medium: EmptyDirMedium.MEMORY,
          },
        ),
      });
    }

    this.deployment.addContainer(
      withCommonProps({
        image: `postgres:${versions["library/postgres"]}`,
        portNumber: 5432,
        envVariables: {
          POSTGRES_PASSWORD: this.passwordEnvValue,
          PGDATA: EnvValue.fromValue("/var/lib/postgresql/data/pgdata"),
          POSTGRES_DB: EnvValue.fromValue(props.database),
        },
        // - args:
        // - pg_resetwal
        // - /var/lib/postgresql/data
        args: props.walTmpfs
          ? ["pg_resetwal", "/var/lib/postgresql/data"]
          : undefined,
        securityContext: {
          user: UID,
          group: GID,
          // pg fails to start without this
          readOnlyRootFilesystem: false,
        },
        volumeMounts,
      }),
    );

    this.service = this.deployment.exposeViaService();
  }
}
