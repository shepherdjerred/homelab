import merge from "merge";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "cdk8s-plus";
import { Construct } from "constructs";
import { Size } from "cdk8s";

export class LocalPathVolume extends Construct {
  public readonly claim: PersistentVolumeClaim;
  constructor(
    scope: Construct,
    id: string,
    props: PersistentVolumeClaimProps,
  ) {
    super(scope, id);
    const baseProps: PersistentVolumeClaimProps = {
      // storage size doesn't matter for local-path
      storage: Size.gibibytes(2),
      accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
      volumeMode: PersistentVolumeMode.FILE_SYSTEM,
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
