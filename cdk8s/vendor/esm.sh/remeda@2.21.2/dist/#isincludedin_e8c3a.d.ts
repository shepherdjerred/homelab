import { IsLiteral } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import { I as IsUnion } from './IsUnion-Bx34mF34.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

/**
 * A "constant" tuple is a type that has a single runtime value that can fulfil
 * it. This means that it doesn't have any variadic/rest/spread/array parts, and
 * that all it's values are singular (non-union) literals.
 *
 * We use this type to allow narrowing when checking against a set of values
 * defined as a const.
 *
 * @example
 *   type T1 = IsConstantTuple<["cat", "dog", 3, true]>; // => true;
 *   type T2 = IsConstantTuple<["cat" | "dog"]>; // false;
 *   type T2 = IsConstantTuple<["cat", ...Array<"cat">]>; // false;
 */
type IsConstantTuple<T extends IterableContainer> = T extends readonly [] ? true : T extends readonly [infer Head, ...infer Rest] ? IsUnion<Head> extends true ? false : IsConstantTuple<Rest> : false;
/**
 * There is no way to tell Typescript to only narrow the "accepted" side of a
 * type-predicate and so in many cases the negated side is also affected, this
 * results in over-narrowing in many cases, breaking typing. For this reason we
 * only want to use the type-predicate variant of `isIncludedIn` when we can
 * assume the result represents the expected types (closely enough). This is not
 * and ideal solution and we will still generate wrong types in some cases (see
 * tests), but it reduces the surface of this problem significantly, while still
 * keeping the utility of `isIncludedIn` for the common cases.
 *
 * TL;DR - The types are narrowable when: T is literal and S is a pure tuple, or
 * when T isn't a literal, but S is.
 *
 * @example
 *   const data = 1 as 1 | 2 | 3;
 *   const container = [] as Array<1 | 2>;
 *   if (isIncludedIn(data, container)) {
 *     ... it makes sense to narrow data to `1 | 2` as the value `3` is not part
 *     ... of the typing of container, so will never result in being true.
 *   } else {
 *     ... but it doesn't make sense to narrow the value to 3 here, because 1
 *     ... and 2 are still valid values for data, when container doesn't include
 *     ... them **at runtime**.
 *     ... Typescript narrows the _rejected_ branch based on how it narrowed the
 *     ... _accepted_ clause, and we can't control that; because our input type
 *     ... is `1 | 2 | 3` and the accepted side is `1 | 2`, the rejected side is
 *     ... typed `Exclude<1 | 2 | 3, 1 | 2>`, which is `3`.
 *   }
 * }
 */
type IsNarrowable<T, S extends IterableContainer<T>> = IsLiteral<T> extends true ? IsConstantTuple<S> : IsLiteral<S[number]>;
/**
 * Checks if the item is included in the container. This is a wrapper around
 * `Array.prototype.includes` and `Set.prototype.has` and thus relies on the
 * same equality checks that those functions do (which is reference equality,
 * e.g. `===`). In some cases the input's type is also narrowed to the
 * container's item types.
 *
 * Notice that unlike most functions, this function takes a generic item as it's
 * data and **an array** as it's parameter.
 *
 * @param data - The item that is checked.
 * @param container - The items that are checked against.
 * @returns `true` if the item is in the container, or `false` otherwise. In
 * cases the type of `data` is also narrowed down.
 * @signature
 *   R.isIncludedIn(data, container);
 * @example
 *   R.isIncludedIn(2, [1, 2, 3]); // => true
 *   R.isIncludedIn(4, [1, 2, 3]); // => false
 *
 *   const data = "cat" as "cat" | "dog" | "mouse";
 *   R.isIncludedIn(data, ["cat", "dog"] as const); // true (typed "cat" | "dog");
 * @dataFirst
 * @category Guard
 */
declare function isIncludedIn<T, S extends IterableContainer<T>>(data: T, container: IsNarrowable<T, S> extends true ? S : never): data is S[number];
declare function isIncludedIn<T, S extends T>(data: T, container: IterableContainer<S>): boolean;
/**
 * Checks if the item is included in the container. This is a wrapper around
 * `Array.prototype.includes` and `Set.prototype.has` and thus relies on the
 * same equality checks that those functions do (which is reference equality,
 * e.g. `===`). In some cases the input's type is also narrowed to the
 * container's item types.
 *
 * Notice that unlike most functions, this function takes a generic item as it's
 * data and **an array** as it's parameter.
 *
 * @param container - The items that are checked against.
 * @returns `true` if the item is in the container, or `false` otherwise. In
 * cases the type of `data` is also narrowed down.
 * @signature
 *   R.isIncludedIn(container)(data);
 * @example
 *   R.pipe(2, R.isIncludedIn([1, 2, 3])); // => true
 *   R.pipe(4, R.isIncludedIn([1, 2, 3])); // => false
 *
 *   const data = "cat" as "cat" | "dog" | "mouse";
 *   R.pipe(
 *     data,
 *     R.isIncludedIn(["cat", "dog"] as const),
 *   ); // => true (typed "cat" | "dog");
 * @dataLast
 * @category Guard
 */
declare function isIncludedIn<T, S extends IterableContainer<T>>(container: IsNarrowable<T, S> extends true ? S : never): (data: T) => data is S[number];
declare function isIncludedIn<T, S extends T>(container: IterableContainer<S>): (data: T) => boolean;

export { isIncludedIn };
