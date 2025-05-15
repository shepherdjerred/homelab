import merge from "merge";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "cdk8s-plus";
import { Construct } from "constructs";
import { Size } from "cdk8s";

export class ZfsHddVolume extends Construct {
  public readonly claim: PersistentVolumeClaim;
  constructor(
    scope: Construct,
    id: string,
    props: PersistentVolumeClaimProps,
  ) {
    super(scope, id);
    const baseProps: PersistentVolumeClaimProps = {
      storage: props.storage || Size.gibibytes(8),
      storageClassName: "host-zfs-hdd-shared",
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
