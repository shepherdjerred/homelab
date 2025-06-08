import { Construct } from "constructs";
import { Deployment, DeploymentStrategy } from "cdk8s-plus-31";
import { Service } from "cdk8s-plus-31";
import { withCommonProps } from "../../utils/common.ts";
import versions from "../../versions.ts";

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
