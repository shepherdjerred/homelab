import { KeysOfUnion, SharedUnionFields, Simplify, EmptyObject, Merge } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import { N as NonEmptyArray } from './NonEmptyArray-C9Od1wmF.d.ts';
import { T as TupleParts } from './TupleParts-CP0H7BrE.d.ts';

/**
 * Gets the set of keys that are not shared by all members of a union. This is the complement of the keys of {@link SharedUnionFields}.
 */
type DisjointUnionFieldKeys<T extends object> = Exclude<KeysOfUnion<T>, keyof SharedUnionFields<T>>;
/**
 * Gets the set of fields that are not shared by all members of a union. This is the complement of {@link SharedUnionFields}.
 */
type DisjointUnionFields<T extends object> = {
    [K in DisjointUnionFieldKeys<T>]: T extends Partial<Record<K, unknown>> ? T[K] : never;
};

/**
 * Merge a tuple of object types, where props from later objects override earlier props.
 */
type MergeTuple<T extends IterableContainer, Result = object> = T extends readonly [infer Head, ...infer Rest] ? MergeTuple<Rest, Merge<Result, Head>> : Result;
type MergeUnion<T extends object> = Simplify<SharedUnionFields<T> & Partial<DisjointUnionFields<T>>>;
type MergeAll<T extends IterableContainer<object>> = TupleParts<T> extends {
    item: never;
} ? T extends readonly [] ? EmptyObject : MergeTuple<T> : MergeUnion<T[number]> | EmptyObject;
/**
 * Merges a list of objects into a single object.
 *
 * @param objects - The array of objects.
 * @returns A new object merged with all of the objects in the list. If the list is empty, an empty object is returned.
 * @signature
 *    R.mergeAll(objects)
 * @example
 *    R.mergeAll([{ a: 1, b: 1 }, { b: 2, c: 3 }, { d: 10 }]) // => { a: 1, b: 2, c: 3, d: 10 }
 *    R.mergeAll([]) // => {}
 * @dataFirst
 * @category Array
 */
declare function mergeAll<T extends object>(objects: Readonly<NonEmptyArray<T>>): MergeUnion<T>;
declare function mergeAll<T extends IterableContainer<object>>(objects: T): MergeAll<T>;

export { mergeAll };
