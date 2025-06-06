import { ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
/**
 * Properties for initialization of `ConfigMap`.
 */
export interface ConfigMapProps extends base.ResourceProps {
    /**
     * BinaryData contains the binary data.
     *
     * Each key must consist of alphanumeric characters, '-', '_' or '.'.
     * BinaryData can contain byte sequences that are not in the UTF-8 range. The
     * keys stored in BinaryData must not overlap with the ones in the Data field,
     * this is enforced during validation process.
     *
     * You can also add binary data using `configMap.addBinaryData()`.
     */
    readonly binaryData?: {
        [key: string]: string;
    };
    /**
     * Data contains the configuration data.
     *
     * Each key must consist of alphanumeric characters, '-', '_' or '.'. Values
     * with non-UTF-8 byte sequences must use the BinaryData field. The keys
     * stored in Data must not overlap with the keys in the BinaryData field, this
     * is enforced during validation process.
     *
     * You can also add data using `configMap.addData()`.
     */
    readonly data?: {
        [key: string]: string;
    };
    /**
     * If set to true, ensures that data stored in the ConfigMap cannot be updated (only object metadata can be modified).
     * If not set to true, the field can be modified at any time.
     *
     * @default false
     */
    readonly immutable?: boolean;
}
/**
 * Represents a config map.
 */
export interface IConfigMap extends base.IResource {
}
/**
 * ConfigMap holds configuration data for pods to consume.
 */
export declare class ConfigMap extends base.Resource implements IConfigMap {
    /**
     * Represents a ConfigMap created elsewhere.
     */
    static fromConfigMapName(scope: Construct, id: string, name: string): IConfigMap;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "configmaps";
    private readonly _binaryData;
    private readonly _data;
    /**
     * Whether or not this config map is immutable.
     */
    readonly immutable: boolean;
    constructor(scope: Construct, id: string, props?: ConfigMapProps);
    /**
     * Adds a data entry to the config map.
     * @param key The key
     * @param value The value
     *
     * @throws if there is either a `data` or `binaryData` entry with the same key
     */
    addData(key: string, value: string): void;
    /**
     * The data associated with this config map.
     *
     * Returns an copy. To add data records, use `addData()` or `addBinaryData()`.
     */
    get data(): Record<string, string>;
    /**
     * Adds a binary data entry to the config map. BinaryData can contain byte
     * sequences that are not in the UTF-8 range.
     * @param key The key
     * @param value The value
     *
     * @throws if there is either a `data` or `binaryData` entry with the same key
     */
    addBinaryData(key: string, value: string): void;
    /**
     * The binary data associated with this config map.
     *
     * Returns a copy. To add data records, use `addBinaryData()` or `addData()`.
     */
    get binaryData(): Record<string, string>;
    /**
     * Adds a file to the ConfigMap.
     * @param localFile The path to the local file
     * @param key The ConfigMap key (default to the file name).
     */
    addFile(localFile: string, key?: string): void;
    /**
     * Adds a directory to the ConfigMap.
     * @param localDir A path to a local directory
     * @param options Options
     */
    addDirectory(localDir: string, options?: AddDirectoryOptions): void;
    private verifyKeyAvailable;
    private synthesizeData;
    private synthesizeBinaryData;
}
/**
 * Options for `configmap.addDirectory()`
 */
export interface AddDirectoryOptions {
    /**
     * A prefix to add to all keys in the config map.
     * @default ""
     */
    readonly keyPrefix?: string;
    /**
     * Glob patterns to exclude when adding files.
     * @default - include all files
     */
    readonly exclude?: string[];
}
