import { E as EnumerableStringKeyOf } from './EnumerableStringKeyOf-BQ4aR5ep.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

type Keys<T> = T extends IterableContainer ? ArrayKeys<T> : ObjectKeys<T>;
type ArrayKeys<T extends IterableContainer> = {
    -readonly [Index in keyof T]: Index extends number | string ? `${IsIndexAfterSpread<T, Index> extends true ? number : Index}` : never;
};
type IsIndexAfterSpread<T extends IterableContainer, Index extends number | string> = IndicesAfterSpread<T> extends never ? false : Index extends `${IndicesAfterSpread<T>}` ? true : false;
type IndicesAfterSpread<T extends ReadonlyArray<unknown> | [], Iterations extends ReadonlyArray<unknown> = []> = T[number] extends never ? never : T extends readonly [unknown, ...infer Tail] ? IndicesAfterSpread<Tail, [unknown, ...Iterations]> : T extends readonly [...infer Head, unknown] ? IndicesAfterSpread<Head, [unknown, ...Iterations]> | Iterations["length"] : Iterations["length"];
type ObjectKeys<T> = T extends Record<PropertyKey, never> ? [] : Array<EnumerableStringKeyOf<T>>;
/**
 * Returns a new array containing the keys of the array or object.
 *
 * @param data - Either an array or an object.
 * @signature
 *    R.keys(source)
 * @example
 *    R.keys(['x', 'y', 'z']); // => ['0', '1', '2']
 *    R.keys({ a: 'x', b: 'y', 5: 'z' }); // => ['a', 'b', '5']
 * @dataFirst
 * @category Object
 */
declare function keys<T extends object>(data: T): Keys<T>;
/**
 * Returns a new array containing the keys of the array or object.
 *
 * @signature
 *    R.keys()(source)
 * @example
 *    R.Pipe(['x', 'y', 'z'], keys()); // => ['0', '1', '2']
 *    R.pipe({ a: 'x', b: 'y', 5: 'z' } as const, R.keys()) // => ['a', 'b', '5']
 * @dataLast
 * @category Object
 */
declare function keys(): <T extends object>(data: T) => Keys<T>;

export { keys };
