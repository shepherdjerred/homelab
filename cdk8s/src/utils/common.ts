import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";
import { ContainerProps, EnvValue } from "npm:cdk8s-plus-27";

export const ROOT_UID = 0;
export const ROOT_GID = 0;

const commonEnv = {
  TZ: EnvValue.fromValue("America/Los_Angeles"),
};

export const commonProps: Partial<ContainerProps> = {
  envVariables: commonEnv,
  resources: {},
};

export function withCommonProps(props: ContainerProps): ContainerProps {
  return merge({}, commonProps, props);
}
