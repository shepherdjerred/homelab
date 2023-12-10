import { ContainerProps, EnvValue } from "npm:cdk8s-plus-27";
import { merge } from "npm:remeda";

const commonEnv = {
  TZ: EnvValue.fromValue("US/Los_Angeles"),
};

export const commonProps: Partial<ContainerProps> = {
  envVariables: commonEnv,
  resources: {},
};

export function withCommonProps(props: ContainerProps): ContainerProps {
  return merge(commonProps, props);
}
