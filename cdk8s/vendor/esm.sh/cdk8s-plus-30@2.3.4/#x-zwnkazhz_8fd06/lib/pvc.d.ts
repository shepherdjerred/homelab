import { Size, ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as pv from './pv.d.ts';
/**
 * Contract of a `PersistentVolumeClaim`.
 */
export interface IPersistentVolumeClaim extends base.IResource {
}
/**
 * Properties for `PersistentVolumeClaim`.
 */
export interface PersistentVolumeClaimProps extends base.ResourceProps {
    /**
     * Contains the access modes the volume should support.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
     * @default - No access modes requirement.
     */
    readonly accessModes?: PersistentVolumeAccessMode[];
    /**
     * Minimum storage size the volume should have.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
     * @default - No storage requirement.
     */
    readonly storage?: Size;
    /**
     * Name of the StorageClass required by the claim.
     * When this property is not set, the behavior is as follows:
     *
     * - If the admission plugin is turned on, the storage class marked as default will be used.
     * - If the admission plugin is turned off, the pvc can only be bound to volumes without a storage class.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
     * @default - Not set.
     */
    readonly storageClassName?: string;
    /**
     * Defines what type of volume is required by the claim.
     *
     * @default VolumeMode.FILE_SYSTEM
     */
    readonly volumeMode?: PersistentVolumeMode;
    /**
     * The PersistentVolume backing this claim.
     *
     * The control plane still checks that storage class, access modes,
     * and requested storage size on the volume are valid.
     *
     * Note that in order to guarantee a proper binding, the volume should
     * also define a `claimRef` referring to this claim. Otherwise, the volume may be
     * claimed be other pvc's before it gets a chance to bind to this one.
     *
     * If the volume is managed (i.e not imported), you can use `pv.claim()` to easily
     * create a bi-directional bounded claim.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding.
     * @default - No specific volume binding.
     */
    readonly volume?: pv.IPersistentVolume;
}
/**
 * A PersistentVolumeClaim (PVC) is a request for storage by a user.
 * It is similar to a Pod. Pods consume node resources and PVCs consume PV resources.
 * Pods can request specific levels of resources (CPU and Memory).
 * Claims can request specific size and access modes
 */
export declare class PersistentVolumeClaim extends base.Resource implements IPersistentVolumeClaim {
    /**
     * Imports a pvc from the cluster as a reference.
     */
    static fromClaimName(scope: Construct, id: string, claimName: string): IPersistentVolumeClaim;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "persistentvolumeclaims";
    /**
     * Storage requirement of this claim.
     */
    readonly storage?: Size;
    /**
     * Volume mode requirement of this claim.
     */
    readonly volumeMode: PersistentVolumeMode;
    /**
     * Storage class requirment of this claim.
     */
    readonly storageClassName?: string;
    private readonly _accessModes?;
    private _volume?;
    constructor(scope: Construct, id: string, props?: PersistentVolumeClaimProps);
    /**
     * Access modes requirement of this claim.
     */
    get accessModes(): PersistentVolumeAccessMode[] | undefined;
    /**
     * PV this claim is bound to. Undefined means the claim is not bound
     * to any specific volume.
     */
    get volume(): pv.IPersistentVolume | undefined;
    /**
     * Bind a claim to a specific volume.
     * Note that you must also bind the volume to the claim.
     *
     * @see https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding
     *
     * @param vol The PV to bind to.
     */
    bind(vol: pv.IPersistentVolume): void;
    /**
     * @internal
     */
    _toKube(): k8s.PersistentVolumeClaimSpec;
}
/**
 * Access Modes.
 */
export declare enum PersistentVolumeAccessMode {
    /**
     * The volume can be mounted as read-write by a single node.
     * ReadWriteOnce access mode still can allow multiple pods to access
     * the volume when the pods are running on the same node.
     */
    READ_WRITE_ONCE = "ReadWriteOnce",
    /**
     * The volume can be mounted as read-only by many nodes.
     */
    READ_ONLY_MANY = "ReadOnlyMany",
    /**
     * The volume can be mounted as read-write by many nodes.
     */
    READ_WRITE_MANY = "ReadWriteMany",
    /**
     * The volume can be mounted as read-write by a single Pod.
     * Use ReadWriteOncePod access mode if you want to ensure that
     * only one pod across whole cluster can read that PVC or write to it.
     * This is only supported for CSI volumes and Kubernetes version 1.22+.
     */
    READ_WRITE_ONCE_POD = "ReadWriteOncePod"
}
/**
 * Volume Modes.
 */
export declare enum PersistentVolumeMode {
    /**
     * Volume is ounted into Pods into a directory.
     * If the volume is backed by a block device and the device is empty,
     * Kubernetes creates a filesystem on the device before mounting it
     * for the first time.
     */
    FILE_SYSTEM = "Filesystem",
    /**
     * Use a volume as a raw block device. Such volume is presented into a Pod as a block device,
     * without any filesystem on it. This mode is useful to provide a Pod the fastest possible way
     * to access a volume, without any filesystem layer between the Pod
     * and the volume. On the other hand, the application running in
     * the Pod must know how to handle a raw block device
     */
    BLOCK = "Block"
}
