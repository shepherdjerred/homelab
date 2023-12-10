import { EnvValue } from "npm:cdk8s-plus-27";

export const UID = 1000;
export const GID = 1000;

export function getVars(): Record<string, EnvValue> {
  return {
    PUID: EnvValue.fromValue(UID.toString()),
    PGID: EnvValue.fromValue(GID.toString()),
    TZ: EnvValue.fromValue("US/Los_Angeles"),
  };
}
