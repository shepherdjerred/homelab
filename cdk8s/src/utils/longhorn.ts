import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "npm:cdk8s-plus-27";
import { Construct } from "npm:constructs";
import { Size } from "npm:cdk8s";

export class LonghornVolume extends Construct {
  public readonly claim: PersistentVolumeClaim;
  constructor(
    scope: Construct,
    id: string,
    props: Omit<PersistentVolumeClaimProps, "storageClassName">,
  ) {
    super(scope, id);
    const baseProps = {
      storage: Size.gibibytes(2),
      accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
      volumeMode: PersistentVolumeMode.FILE_SYSTEM,
      storageClassName: "longhorn",
    };
    this.claim = new PersistentVolumeClaim(
      scope,
      `${id}-pvc`,
      merge(baseProps, props),
    );
  }
}
