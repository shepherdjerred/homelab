import { merge } from "lodash";
import {
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeClaimProps,
  PersistentVolumeMode,
} from "cdk8s-plus-31";
import { Construct } from "constructs";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";
import { type SetRequired } from "type-fest";

export class ZfsHddVolume extends Construct {
  public readonly claim: PersistentVolumeClaim;
  constructor(
    scope: Construct,
    id: string,
    props: SetRequired<PersistentVolumeClaimProps, "storage">
  ) {
    super(scope, id);
    const baseProps: PersistentVolumeClaimProps = {
      storage: props.storage,
      storageClassName: HDD_STORAGE_CLASS,
      accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
      volumeMode: PersistentVolumeMode.FILE_SYSTEM,
      metadata: {
        name: `${id}`,
      },
    };

    this.claim = new PersistentVolumeClaim(
      scope,
      `${id}-pvc`,
      merge({}, baseProps, props)
    );
  }
}
