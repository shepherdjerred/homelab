import { Construct } from "constructs";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  ISecret,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus";
import { withCommonProps } from "../../utils/common.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import versions from "../../versions.ts";

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
    wait?: boolean;
    replicas?: number;
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
      replicas: props.replicas ?? 1,
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

    this.deployment.addContainer(
      withCommonProps({
        image: `postgres:${versions["library/postgres"]}`,
        portNumber: 5432,
        envVariables: {
          POSTGRES_PASSWORD: this.passwordEnvValue,
          PGDATA: EnvValue.fromValue("/var/lib/postgresql/data/pgdata"),
          POSTGRES_DB: EnvValue.fromValue(props.database),
        },
        args: props.wait ? ["sleep", "infinity"] : undefined,
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
