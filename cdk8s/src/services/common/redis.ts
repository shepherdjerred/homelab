import { Construct } from "https://esm.sh/constructs@10.3.0";
import {
  Deployment,
  DeploymentStrategy,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Service } from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { withCommonProps } from "../../utils/common.ts";
import versions from "../../versions/versions.ts";

export class Redis extends Construct {
  public readonly service: Service;
  public readonly deployment: Deployment;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const UID = 999;
    const GID = 999;

    this.deployment = new Deployment(scope, `${id}-deployment`, {
      replicas: 1,
      strategy: DeploymentStrategy.recreate(),
    });

    this.deployment.addContainer(
      withCommonProps({
        image: `redis:${versions["library/redis"]}`,
        portNumber: 6379,
        securityContext: {
          user: UID,
          group: GID,
        },
      }),
    );

    this.service = this.deployment.exposeViaService();
  }
}
