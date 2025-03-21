import { IDependable } from './dependency.d.ts';
import { MetadataEntry } from './metadata.d.ts';
/**
 * Represents a construct.
 */
export interface IConstruct extends IDependable {
    /**
     * The tree node.
     */
    readonly node: Node;
}
/**
 * Represents the construct node in the scope tree.
 */
export declare class Node {
    private readonly host;
    /**
     * Separator used to delimit construct path components.
     */
    static readonly PATH_SEP = "/";
    /**
     * Returns the node associated with a construct.
     * @param construct the construct
     *
     * @deprecated use `construct.node` instead
     */
    static of(construct: IConstruct): Node;
    /**
     * Returns the scope in which this construct is defined.
     *
     * The value is `undefined` at the root of the construct scope tree.
     */
    readonly scope?: IConstruct;
    /**
     * The id of this construct within the current scope.
     *
     * This is a scope-unique id. To obtain an app-unique id for this construct, use `addr`.
     */
    readonly id: string;
    private _locked;
    private readonly _children;
    private readonly _context;
    private readonly _metadata;
    private readonly _dependencies;
    private _defaultChild;
    private readonly _validations;
    private _addr?;
    constructor(host: Construct, scope: IConstruct, id: string);
    /**
     * The full, absolute path of this construct in the tree.
     *
     * Components are separated by '/'.
     */
    get path(): string;
    /**
     * Returns an opaque tree-unique address for this construct.
     *
     * Addresses are 42 characters hexadecimal strings. They begin with "c8"
     * followed by 40 lowercase hexadecimal characters (0-9a-f).
     *
     * Addresses are calculated using a SHA-1 of the components of the construct
     * path.
     *
     * To enable refactoring of construct trees, constructs with the ID `Default`
     * will be excluded from the calculation. In those cases constructs in the
     * same tree may have the same address.
     *
     * @example c83a2846e506bcc5f10682b564084bca2d275709ee
     */
    get addr(): string;
    /**
     * Return a direct child by id, or undefined
     *
     * @param id Identifier of direct child
     * @returns the child if found, or undefined
     */
    tryFindChild(id: string): IConstruct | undefined;
    /**
     * Return a direct child by id
     *
     * Throws an error if the child is not found.
     *
     * @param id Identifier of direct child
     * @returns Child with the given id.
     */
    findChild(id: string): IConstruct;
    /**
     * Returns the child construct that has the id `Default` or `Resource"`.
     * This is usually the construct that provides the bulk of the underlying functionality.
     * Useful for modifications of the underlying construct that are not available at the higher levels.
     *
     * @throws if there is more than one child
     * @returns a construct or undefined if there is no default child
     */
    get defaultChild(): IConstruct | undefined;
    /**
     * Override the defaultChild property.
     *
     * This should only be used in the cases where the correct
     * default child is not named 'Resource' or 'Default' as it
     * should be.
     *
     * If you set this to undefined, the default behavior of finding
     * the child named 'Resource' or 'Default' will be used.
     */
    set defaultChild(value: IConstruct | undefined);
    /**
     * All direct children of this construct.
     */
    get children(): IConstruct[];
    /**
     * Return this construct and all of its children in the given order
     */
    findAll(order?: ConstructOrder): IConstruct[];
    /**
     * This can be used to set contextual values.
     * Context must be set before any children are added, since children may consult context info during construction.
     * If the key already exists, it will be overridden.
     * @param key The context key
     * @param value The context value
     */
    setContext(key: string, value: any): void;
    /**
     * Retrieves a value from tree context if present. Otherwise, would throw an error.
     *
     * Context is usually initialized at the root, but can be overridden at any point in the tree.
     *
     * @param key The context key
     * @returns The context value or throws error if there is no context value for this key
     */
    getContext(key: string): any;
    /**
     * Retrieves the all context of a node from tree context.
     *
     * Context is usually initialized at the root, but can be overridden at any point in the tree.
     *
     * @param defaults Any keys to override the retrieved context
     * @returns The context object or an empty object if there is discovered context
     */
    getAllContext(defaults?: object): any;
    /**
     * Retrieves a value from tree context.
     *
     * Context is usually initialized at the root, but can be overridden at any point in the tree.
     *
     * @param key The context key
     * @returns The context value or `undefined` if there is no context value for this key.
     */
    tryGetContext(key: string): any;
    /**
     * An immutable array of metadata objects associated with this construct.
     * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
     */
    get metadata(): MetadataEntry[];
    /**
     * Adds a metadata entry to this construct.
     * Entries are arbitrary values and will also include a stack trace to allow tracing back to
     * the code location for when the entry was added. It can be used, for example, to include source
     * mapping in CloudFormation templates to improve diagnostics.
     * Note that construct metadata is not the same as CloudFormation resource metadata and is never written to the CloudFormation template.
     * The metadata entries are written to the Cloud Assembly Manifest if the `treeMetadata` property is specified in the props of the App that contains this Construct.
     *
     * @param type a string denoting the type of metadata
     * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
     * @param options options
     */
    addMetadata(type: string, data: any, options?: MetadataOptions): void;
    /**
     * All parent scopes of this construct.
     *
     * @returns a list of parent scopes. The last element in the list will always
     * be the current construct and the first element will be the root of the
     * tree.
     */
    get scopes(): IConstruct[];
    /**
     * Returns the root of the construct tree.
     * @returns The root of the construct tree.
     */
    get root(): IConstruct;
    /**
     * Returns true if this construct or the scopes in which it is defined are
     * locked.
     */
    get locked(): boolean;
    /**
     * Add an ordering dependency on another construct.
     *
     * An `IDependable`
     */
    addDependency(...deps: IDependable[]): void;
    /**
     * Return all dependencies registered on this node (non-recursive).
     */
    get dependencies(): IConstruct[];
    /**
     * Remove the child with the given name, if present.
     *
     * @returns Whether a child with the given name was deleted.
     */
    tryRemoveChild(childName: string): boolean;
    /**
     * Adds a validation to this construct.
     *
     * When `node.validate()` is called, the `validate()` method will be called on
     * all validations and all errors will be returned.
     *
     * @param validation The validation object
     */
    addValidation(validation: IValidation): void;
    /**
     * Validates this construct.
     *
     * Invokes the `validate()` method on all validations added through
     * `addValidation()`.
     *
     * @returns an array of validation error messages associated with this
     * construct.
     */
    validate(): string[];
    /**
     * Locks this construct from allowing more children to be added. After this
     * call, no more children can be added to this construct or to any children.
     */
    lock(): void;
    /**
     * Adds a child construct to this node.
     *
     * @param child The child construct
     * @param childName The type name of the child construct.
     * @returns The resolved path part name of the child
     */
    private addChild;
}
/**
 * Represents the building block of the construct graph.
 *
 * All constructs besides the root construct must be created within the scope of
 * another construct.
 */
export declare class Construct implements IConstruct {
    /**
     * Checks if `x` is a construct.
     *
     * Use this method instead of `instanceof` to properly detect `Construct`
     * instances, even when the construct library is symlinked.
     *
     * Explanation: in JavaScript, multiple copies of the `constructs` library on
     * disk are seen as independent, completely different libraries. As a
     * consequence, the class `Construct` in each copy of the `constructs` library
     * is seen as a different class, and an instance of one class will not test as
     * `instanceof` the other class. `npm install` will not create installations
     * like this, but users may manually symlink construct libraries together or
     * use a monorepo tool: in those cases, multiple copies of the `constructs`
     * library can be accidentally installed, and `instanceof` will behave
     * unpredictably. It is safest to avoid using `instanceof`, and using
     * this type-testing method instead.
     *
     * @returns true if `x` is an object created from a class which extends `Construct`.
     * @param x Any object
     */
    static isConstruct(x: any): x is Construct;
    /**
     * The tree node.
     */
    readonly node: Node;
    /**
     * Creates a new construct node.
     *
     * @param scope The scope in which to define this construct
     * @param id The scoped construct ID. Must be unique amongst siblings. If
     * the ID includes a path separator (`/`), then it will be replaced by double
     * dash `--`.
     */
    constructor(scope: Construct, id: string);
    /**
     * Returns a string representation of this construct.
     */
    toString(): string;
}
/**
 * Implement this interface in order for the construct to be able to validate itself.
 */
export interface IValidation {
    /**
     * Validate the current construct.
     *
     * This method can be implemented by derived constructs in order to perform
     * validation logic. It is called on all constructs before synthesis.
     *
     * @returns An array of validation error messages, or an empty array if there the construct is valid.
     */
    validate(): string[];
}
/**
 * In what order to return constructs
 */
export declare enum ConstructOrder {
    /**
     * Depth-first, pre-order
     */
    PREORDER = 0,
    /**
     * Depth-first, post-order (leaf nodes first)
     */
    POSTORDER = 1
}
/**
 * Options for `construct.addMetadata()`.
 */
export interface MetadataOptions {
    /**
     * Include stack trace with metadata entry.
     * @default false
     */
    readonly stackTrace?: boolean;
    /**
     * A JavaScript function to begin tracing from.
     *
     * This option is ignored unless `stackTrace` is `true`.
     *
     * @default addMetadata()
     */
    readonly traceFromFunction?: any;
}
/**
 * Creates a new root construct node.
 *
 * The root construct represents the top of the construct tree and is not contained within a parent scope itself.
 * For root constructs, the id is optional.
 */
export declare class RootConstruct extends Construct {
    /**
     * Creates a new root construct node.
     *
     * @param id The scoped construct ID. Must be unique amongst siblings. If
     * the ID includes a path separator (`/`), then it will be replaced by double
     * dash `--`.
     */
    constructor(id?: string);
}
