import { ApiObject, Size } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as pvc from './pvc.d.ts';
import * as volume from './volume.d.ts';
/**
 * Contract of a `PersistentVolumeClaim`.
 */
export interface IPersistentVolume extends base.IResource {
}
/**
 * Properties for `PersistentVolume`.
 */
export interface PersistentVolumeProps extends base.ResourceProps {
    /**
     * Contains all ways the volume can be mounted.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes
     * @default - No access modes.
     */
    readonly accessModes?: pvc.PersistentVolumeAccessMode[];
    /**
     * What is the storage capacity of this volume.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
     * @default - No specified.
     */
    readonly storage?: Size;
    /**
     * Part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim.
     * Expected to be non-nil when bound.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#binding
     * @default - Not bound to a specific claim.
     */
    readonly claim?: pvc.IPersistentVolumeClaim;
    /**
     * A list of mount options, e.g. ["ro", "soft"]. Not validated - mount will simply fail if one is invalid.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options
     * @default - No options.
     */
    readonly mountOptions?: string[];
    /**
     * When a user is done with their volume, they can delete the PVC objects from the API that
     * allows reclamation of the resource. The reclaim policy tells the cluster what to do with
     * the volume after it has been released of its claim.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#reclaiming
     * @default PersistentVolumeReclaimPolicy.RETAIN
     */
    readonly reclaimPolicy?: PersistentVolumeReclaimPolicy;
    /**
     * Name of StorageClass to which this persistent volume belongs.
     *
     * @default - Volume does not belong to any storage class.
     */
    readonly storageClassName?: string;
    /**
     * Defines what type of volume is required by the claim.
     *
     * @default VolumeMode.FILE_SYSTEM
     */
    readonly volumeMode?: pvc.PersistentVolumeMode;
}
/**
 * A PersistentVolume (PV) is a piece of storage in the cluster that has been
 * provisioned by an administrator or dynamically provisioned using Storage Classes.
 * It is a resource in the cluster just like a node is a cluster resource.
 * PVs are volume plugins like Volumes, but have a lifecycle independent of any
 * individual Pod that uses the PV. This API object captures the details of the
 * implementation of the storage, be that NFS, iSCSI, or a
 * cloud-provider-specific storage system.
 */
export declare class PersistentVolume extends base.Resource implements IPersistentVolume, volume.IStorage {
    /**
     * Imports a pv from the cluster as a reference.
     */
    static fromPersistentVolumeName(scope: Construct, id: string, volumeName: string): IPersistentVolume;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "persistentvolumes";
    private _claim?;
    /**
     * Storage size of this volume.
     */
    readonly storage?: Size;
    /**
     * Volume mode of this volume.
     */
    readonly mode: pvc.PersistentVolumeMode;
    /**
      * Storage class this volume belongs to.
      */
    readonly storageClassName?: string;
    /**
     * Access modes requirement of this claim.
     */
    private readonly _accessModes?;
    /**
     * Mount options of this volume.
     */
    readonly mountOptions?: string[];
    /**
     * Reclaim policy of this volume.
     */
    readonly reclaimPolicy: PersistentVolumeReclaimPolicy;
    protected constructor(scope: Construct, id: string, props?: PersistentVolumeProps);
    /**
     * Access modes requirement of this claim.
     */
    get accessModes(): pvc.PersistentVolumeAccessMode[] | undefined;
    /**
     * PVC this volume is bound to. Undefined means this volume is not yet
     * claimed by any PVC.
     */
    get claim(): pvc.IPersistentVolumeClaim | undefined;
    /**
     * Reserve a `PersistentVolume` by creating a `PersistentVolumeClaim`
     * that is wired to claim this volume.
     *
     * Note that this method will throw in case the volume is already claimed.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reserving-a-persistentvolume
     */
    reserve(): pvc.PersistentVolumeClaim;
    /**
     * Bind a volume to a specific claim.
     * Note that you must also bind the claim to the volume.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding
     *
     * @param claim The PVC to bind to.
     */
    bind(claim: pvc.IPersistentVolumeClaim): void;
    asVolume(): volume.Volume;
    /**
     * @internal
     */
    _toKube(): k8s.PersistentVolumeSpec;
}
/**
 * Reclaim Policies.
 */
export declare enum PersistentVolumeReclaimPolicy {
    /**
     * The Retain reclaim policy allows for manual reclamation of the resource.
     * When the PersistentVolumeClaim is deleted, the PersistentVolume still exists and the
     * volume is considered "released". But it is not yet available for another claim
     * because the previous claimant's data remains on the volume.
     * An administrator can manually reclaim the volume with the following steps:
     *
     * 1. Delete the PersistentVolume. The associated storage asset in external
     *    infrastructure (such as an AWS EBS, GCE PD, Azure Disk, or Cinder volume) still exists after the PV is deleted.
     * 2. Manually clean up the data on the associated storage asset accordingly.
     * 3. Manually delete the associated storage asset.
     *
     * If you want to reuse the same storage asset, create a new PersistentVolume
     * with the same storage asset definition.
     */
    RETAIN = "Retain",
    /**
     * For volume plugins that support the Delete reclaim policy, deletion removes both the
     * PersistentVolume object from Kubernetes, as well as the associated storage asset in
     * the external infrastructure, such as an AWS EBS, GCE PD, Azure Disk, or Cinder volume.
     * Volumes that were dynamically provisioned inherit the reclaim policy of their StorageClass, which defaults to Delete.
     * The administrator should configure the StorageClass according to users' expectations; otherwise,
     * the PV must be edited or patched after it is created
     */
    DELETE = "Delete"
}
/**
 * Properties for `AwsElasticBlockStorePersistentVolume`.
 */
export interface AwsElasticBlockStorePersistentVolumeProps extends PersistentVolumeProps {
    /**
     * Unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     *
     * @see https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    readonly volumeId: string;
    /**
     * Filesystem type of the volume that you want to mount.
     * Tip: Ensure that the filesystem type is supported by the host operating system.
     *
     * @see https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     * @default 'ext4'
     */
    readonly fsType?: string;
    /**
      * The partition in the volume that you want to mount. If omitted, the default is to mount by volume name.
      * Examples: For volume /dev/sda1, you specify the partition as "1".
      * Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
      *
      * @default - No partition.
      */
    readonly partition?: number;
    /**
      * Specify "true" to force and set the ReadOnly property in VolumeMounts to "true".
      *
      * @see https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      * @default false
      */
    readonly readOnly?: boolean;
}
/**
 * Represents an AWS Disk resource that is attached to a kubelet's host machine and
 * then exposed to the pod.
 *
 * @see https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
 */
export declare class AwsElasticBlockStorePersistentVolume extends PersistentVolume {
    /**
     * Volume id of this volume.
     */
    readonly volumeId: string;
    /**
     * Whether or not it is mounted as a read-only volume.
     */
    readonly readOnly: boolean;
    /**
     * File system type of this volume.
     */
    readonly fsType: string;
    /**
     * Partition of this volume.
     */
    readonly partition?: number;
    constructor(scope: Construct, id: string, props: AwsElasticBlockStorePersistentVolumeProps);
    /**
     * @internal
     */
    _toKube(): k8s.PersistentVolumeSpec;
}
/**
 * Properties for `AzureDiskPersistentVolume`.
 */
export interface AzureDiskPersistentVolumeProps extends PersistentVolumeProps {
    /**
     * The Name of the data disk in the blob storage
     */
    readonly diskName: string;
    /**
     * The URI the data disk in the blob storage
     */
    readonly diskUri: string;
    /**
     * Host Caching mode.
     *
     * @default - AzureDiskPersistentVolumeCachingMode.NONE.
     */
    readonly cachingMode?: volume.AzureDiskPersistentVolumeCachingMode;
    /**
      * Filesystem type to mount. Must be a filesystem type supported by the host operating system.
      *
      * @default 'ext4'
      */
    readonly fsType?: string;
    /**
      * Kind of disk.
      *
      * @default AzureDiskPersistentVolumeKind.SHARED
      */
    readonly kind?: volume.AzureDiskPersistentVolumeKind;
    /**
      * Force the ReadOnly setting in VolumeMounts.
      *
      * @default false
      */
    readonly readOnly?: boolean;
}
/**
 * AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
 */
export declare class AzureDiskPersistentVolume extends PersistentVolume {
    /**
     * Disk name of this volume.
     */
    readonly diskName: string;
    /**
     * Disk URI of this volume.
     */
    readonly diskUri: string;
    /**
     * Whether or not it is mounted as a read-only volume.
     */
    readonly readOnly: boolean;
    /**
     * Caching mode of this volume.
     */
    readonly cachingMode: volume.AzureDiskPersistentVolumeCachingMode;
    /**
     * File system type of this volume.
     */
    readonly fsType: string;
    /**
     * Azure kind of this volume.
     */
    readonly azureKind: volume.AzureDiskPersistentVolumeKind;
    constructor(scope: Construct, id: string, props: AzureDiskPersistentVolumeProps);
    /**
     * @internal
     *
     * @see https://github.com/kubernetes/examples/blob/master/staging/volumes/azure_disk/README.md
     */
    _toKube(): k8s.PersistentVolumeSpec;
}
/**
 * Properties for `GCEPersistentDiskPersistentVolume`.
 */
export interface GCEPersistentDiskPersistentVolumeProps extends PersistentVolumeProps {
    /**
     * Unique name of the PD resource in GCE. Used to identify the disk in GCE.
     *
     * @see https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    readonly pdName: string;
    /**
     * Filesystem type of the volume that you want to mount.
     * Tip: Ensure that the filesystem type is supported by the host operating system.
     *
     * @see https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     * @default 'ext4'
     */
    readonly fsType?: string;
    /**
     * The partition in the volume that you want to mount. If omitted, the default is to mount by volume name.
     * Examples: For volume /dev/sda1, you specify the partition as "1".
     * Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
     *
     * @default - No partition.
     */
    readonly partition?: number;
    /**
     * Specify "true" to force and set the ReadOnly property in VolumeMounts to "true".
     *
     * @see https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     * @default false
     */
    readonly readOnly?: boolean;
}
/**
 * GCEPersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine
 * and then exposed to the pod. Provisioned by an admin.
 *
 * @see https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
 */
export declare class GCEPersistentDiskPersistentVolume extends PersistentVolume {
    /**
     * PD resource in GCE of this volume.
     */
    readonly pdName: string;
    /**
     * Whether or not it is mounted as a read-only volume.
     */
    readonly readOnly: boolean;
    /**
     * File system type of this volume.
     */
    readonly fsType: string;
    /**
     * Partition of this volume.
     */
    readonly partition?: number;
    constructor(scope: Construct, id: string, props: GCEPersistentDiskPersistentVolumeProps);
    /**
     * @internal
     *
     * @see https://github.com/kubernetes/examples/blob/master/staging/volumes/azure_disk/README.md
     */
    _toKube(): k8s.PersistentVolumeSpec;
}
