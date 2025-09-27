import { ContainerProps, EnvValue } from "cdk8s-plus-31";
import { commonProps, ROOT_GID, ROOT_UID } from "./common.ts";
import { merge } from "lodash";

export const LINUXSERVER_UID = 1000;
export const LINUXSERVER_GID = 1000;

const commonLinuxServerProps: Partial<ContainerProps> = {
  ...commonProps,
  envVariables: {
    ...commonProps.envVariables,
    // these variables are used by linuxserver.io images to change volume permissions on startup
    PUID: EnvValue.fromValue(LINUXSERVER_UID.toString()),
    PGID: EnvValue.fromValue(LINUXSERVER_GID.toString()),
  },
  securityContext: {
    // linuxserver.io images initially run as root, and require a writable filesystem
    ensureNonRoot: false,
    readOnlyRootFilesystem: false,
    user: ROOT_UID,
    group: ROOT_GID,
  },
};

export function withCommonLinuxServerProps(
  props: ContainerProps,
): ContainerProps {
  return merge({}, commonLinuxServerProps, props);
}
