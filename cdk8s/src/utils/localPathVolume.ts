import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Construct } from "https://esm.sh/constructs@10.3.0";
import { Size } from "https://esm.sh/cdk8s@2.68.58";

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
