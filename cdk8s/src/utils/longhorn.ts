import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "npm:cdk8s-plus-27";
import { Construct } from "npm:constructs";
import { Size } from "npm:cdk8s";

export type LonghornStorageClass = "longhorn" | "longhorn-ssd" | "longhorn-hdd";

type props = Omit<PersistentVolumeClaimProps, "storageClassName"> & {
  storageClassName?: LonghornStorageClass;
  backup?: boolean;
  namespace?: string;
};

export class LonghornVolume extends Construct {
  public readonly claim: PersistentVolumeClaim;
  constructor(
    scope: Construct,
    id: string,
    props: props,
  ) {
    super(scope, id);
    const baseProps: PersistentVolumeClaimProps = {
      storage: Size.gibibytes(2),
      accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
      volumeMode: PersistentVolumeMode.FILE_SYSTEM,
      storageClassName: props.storageClassName ?? "longhorn",
      metadata: {
        name: `${id}`,
        namespace: props.namespace ?? "turing",
      },
    };

    this.claim = new PersistentVolumeClaim(
      scope,
      `${id}-pvc`,
      merge({}, baseProps, props),
    );
  }
}
