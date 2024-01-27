import { Construct } from "npm:constructs";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  ISecret,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { withCommonProps } from "../../utils/common.ts";
import { LonghornStorageClass, LonghornVolume } from "../../utils/longhorn.ts";
import { Size } from "npm:cdk8s";

export class Postgres extends Construct {
  public readonly passwordItem: OnePasswordItem;
  public readonly passwordSecret: ISecret;
  public readonly passwordEnvValue: EnvValue;
  public readonly deployment: Deployment;
  public readonly longhornVolume: LonghornVolume;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: {
    itemPath: string;
    database: string;
    size: Size;
    storageClass?: LonghornStorageClass;
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

    this.longhornVolume = new LonghornVolume(
      scope,
      `${name}-longhorn`,
      {
        storage: props.size,
        storageClassName: props.storageClass,
      },
    );

    this.deployment.addContainer(
      withCommonProps({
        image: "postgres",
        portNumber: 5432,
        envVariables: {
          POSTGRES_PASSWORD: this.passwordEnvValue,
          PGDATA: EnvValue.fromValue("/var/lib/postgresql/data/pgdata"),
          POSTGRES_DB: EnvValue.fromValue(props.database),
        },
        securityContext: {
          user: UID,
          group: GID,
          // pg fails to start without this
          readOnlyRootFilesystem: false,
        },
        volumeMounts: [
          {
            path: "/var/lib/postgresql/data",
            volume: Volume.fromPersistentVolumeClaim(
              scope,
              `${name}-pvc`,
              this.longhornVolume.claim,
            ),
          },
        ],
      }),
    );

    this.service = this.deployment.exposeViaService();
  }
}
