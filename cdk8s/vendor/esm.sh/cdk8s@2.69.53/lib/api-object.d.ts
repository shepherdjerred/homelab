import { Construct, IConstruct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import { Chart } from './chart.d.ts';
import { JsonPatch } from './json-patch.d.ts';
import { ApiObjectMetadata, ApiObjectMetadataDefinition } from './metadata.d.ts';
/**
 * Options for defining API objects.
 */
export interface ApiObjectProps {
    /**
     * Object metadata.
     *
     * If `name` is not specified, an app-unique name will be allocated by the
     * framework based on the path of the construct within thes construct tree.
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * API version.
     */
    readonly apiVersion: string;
    /**
     * Resource kind.
     */
    readonly kind: string;
    /**
     * Additional attributes for this API object.
     * @jsii ignore
     * @see https://github.com/cdk8s-team/cdk8s-core/issues/1297
     */
    readonly [key: string]: any;
}
export interface GroupVersionKind {
    /**
     * The object's API version (e.g. `authorization.k8s.io/v1`)
     */
    readonly apiVersion: string;
    /**
     * The object kind.
     */
    readonly kind: string;
}
export declare class ApiObject extends Construct {
    private readonly props;
    /**
     * Return whether the given object is an `ApiObject`.
     *
     * We do attribute detection since we can't reliably use 'instanceof'.
  
     * @param o The object to check
     */
    static isApiObject(o: any): o is ApiObject;
    /**
     * Implements `instanceof ApiObject` using the more reliable `ApiObject.isApiObject` static method
     *
     * @param o The object to check
     * @internal
     */
    static [Symbol.hasInstance](o: unknown): o is ApiObject;
    /**
     * Returns the `ApiObject` named `Resource` which is a child of the given
     * construct. If `c` is an `ApiObject`, it is returned directly. Throws an
     * exception if the construct does not have a child named `Default` _or_ if
     * this child is not an `ApiObject`.
     *
     * @param c The higher-level construct
     */
    static of(c: IConstruct): ApiObject;
    /**
     * The name of the API object.
     *
     * If a name is specified in `metadata.name` this will be the name returned.
     * Otherwise, a name will be generated by calling
     * `Chart.of(this).generatedObjectName(this)`, which by default uses the
     * construct path to generate a DNS-compatible name for the resource.
     */
    readonly name: string;
    /**
     * The object's API version (e.g. `authorization.k8s.io/v1`)
     */
    readonly apiVersion: string;
    /**
     * The group portion of the API version (e.g. `authorization.k8s.io`)
     */
    readonly apiGroup: string;
    /**
     * The object kind.
     */
    readonly kind: string;
    /**
     * The chart in which this object is defined.
     */
    readonly chart: Chart;
    /**
     * Metadata associated with this API object.
     */
    readonly metadata: ApiObjectMetadataDefinition;
    /**
     * A set of JSON patch operations to apply to the document after synthesis.
     */
    private readonly patches;
    /**
     * Defines an API object.
     *
     * @param scope the construct scope
     * @param id namespace
     * @param props options
     */
    constructor(scope: Construct, id: string, props: ApiObjectProps);
    /**
     * Create a dependency between this ApiObject and other constructs.
     * These can be other ApiObjects, Charts, or custom.
     *
     * @param dependencies the dependencies to add.
     */
    addDependency(...dependencies: IConstruct[]): void;
    /**
     * Applies a set of RFC-6902 JSON-Patch operations to the manifest
     * synthesized for this API object.
     *
     * @param ops The JSON-Patch operations to apply.
     *
     * @example
     *
     *   kubePod.addJsonPatch(JsonPatch.replace('/spec/enableServiceLinks', true));
     *
     */
    addJsonPatch(...ops: JsonPatch[]): void;
    /**
     * Renders the object to Kubernetes JSON.
     *
     * To disable sorting of dictionary keys in output object set the
     * `CDK8S_DISABLE_SORT` environment variable to any non-empty value.
     */
    toJson(): any;
}
