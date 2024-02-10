import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "npm:cdk8s-plus-27";
import { Construct } from "npm:constructs";
import { Size } from "npm:cdk8s";
import { HddStorageClass, SsdStorageClass } from "./localPathProvisioner.ts";

export type LocalPathStorageClass =
  | typeof HddStorageClass
  | typeof SsdStorageClass;

type props = {
  namespace?: string;
  storageClassName: LocalPathStorageClass;
};

export class LocalPathVolume extends Construct {
  public readonly claim: PersistentVolumeClaim;
  constructor(
    scope: Construct,
    id: string,
    props: props,
  ) {
    super(scope, id);
    const baseProps: PersistentVolumeClaimProps = {
      // storage size doesn't matter for local-path
      storage: Size.gibibytes(2),
      accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
      volumeMode: PersistentVolumeMode.FILE_SYSTEM,
      storageClassName: props.storageClassName,
      metadata: {
        name: `${id}`,
      },
    };

    this.claim = new PersistentVolumeClaim(
      scope,
      `${id}-pvc`,
      merge({}, baseProps, props),
    );
  }
}
