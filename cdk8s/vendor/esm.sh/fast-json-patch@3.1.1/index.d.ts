export * from './module/core.d.ts';
export * from './module/duplex.d.ts';
export {
    PatchError as JsonPatchError,
    _deepClone as deepClone,
    escapePathComponent,
    unescapePathComponent
} from './module/helpers.d.ts';


/**
 * Default export for backwards compat
 */
import * as core from './module/core.d.ts';
import * as duplex from './module/duplex.d.ts';
import { PatchError as JsonPatchError, _deepClone as deepClone, escapePathComponent, unescapePathComponent } from './module/helpers.d.ts';
declare const _default: {
    JsonPatchError: typeof JsonPatchError;
    deepClone: typeof deepClone;
    escapePathComponent: typeof escapePathComponent;
    unescapePathComponent: typeof unescapePathComponent;
    unobserve<T>(root: T, observer: duplex.Observer<T>): void;
    observe<T>(obj: Object | T[], callback?: (patches: core.Operation[]) => void): duplex.Observer<T>;
    generate<T>(observer: duplex.Observer<Object>, invertible?: boolean): core.Operation[];
    compare(tree1: Object | any[], tree2: Object | any[], invertible?: boolean): core.Operation[];
    getValueByPointer(document: any, pointer: string): any;
    applyOperation<T>(document: T, operation: core.Operation, validateOperation?: boolean | core.Validator<T>, mutateDocument?: boolean, banPrototypeModifications?: boolean, index?: number): core.OperationResult<T>;
    applyPatch<T>(document: T, patch: core.Operation[], validateOperation?: boolean | core.Validator<T>, mutateDocument?: boolean, banPrototypeModifications?: boolean): core.PatchResult<T>;
    applyReducer<T>(document: T, operation: core.Operation, index: number): T;
    validator(operation: core.Operation, index: number, document?: any, existingPathFragment?: string): void;
    validate<T>(sequence: core.Operation[], document?: T, externalValidator?: core.Validator<T>): JsonPatchError;
    _areEquals(a: any, b: any): boolean;
};
export default _default;
