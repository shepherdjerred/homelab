import { App } from "aws-cdk-lib";
import "source-map-support/register";
import { DomainStack } from "./domain/domain-stack";

const app = new App();
const props = {
  availabilityZone: "us-west-2a",
  env: {
    account: "692594597524",
    region: "us-west-2",
  },
};

new DomainStack(app, "DomainStack", props);
