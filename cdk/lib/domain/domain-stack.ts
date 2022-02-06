import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createDomainResources } from "./domain";

export class DomainStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    createDomainResources(this);
  }
}
