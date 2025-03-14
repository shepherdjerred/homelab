import { IsNegative, IsInteger, Subtract } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import { C as CoercedArray } from './CoercedArray-DRz3tqda.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import { N as NTuple } from './NTuple-BgsZT9dJ.d.ts';
import { T as TupleParts } from './TupleParts-CP0H7BrE.d.ts';

type Drop<T extends IterableContainer, N extends number> = IsNegative<N> extends true ? T : IsInteger<N> extends false ? Array<T[number]> : TupleParts<T>["prefix"] extends [
    ...NTuple<unknown, N>,
    ...infer Remaining
] ? [
    ...Remaining,
    ...CoercedArray<TupleParts<T>["item"]>,
    ...TupleParts<T>["suffix"]
] : 0 extends TupleParts<T>["suffix"]["length"] ? CoercedArray<TupleParts<T>["item"]> : DropUpTo<TupleParts<T>["suffix"], Subtract<N, TupleParts<T>["prefix"]["length"]>> | [...Array<TupleParts<T>["item"]>, ...TupleParts<T>["suffix"]];
/**
 * Arrays with a fixed suffix will result in any number of items being dropped,
 * up to N, and not just N itself. This is because we don't know during typing
 * how many items the "rest" part of the tuple will have in runtime.
 *
 * !Important: This is an internal type and assumes that T is a fixed-size
 * tuple! It will not work if T has a rest element.
 */
type DropUpTo<T, N, Dropped extends ReadonlyArray<unknown> = []> = Dropped["length"] extends N ? T : T extends [unknown, ...infer Rest] ? // Take the current value, and then recurse with the array where it is
DropUpTo<Rest, N, [...Dropped, unknown]> | T : T;
/**
 * Removes first `n` elements from the `array`.
 *
 * @param array - The target array.
 * @param n - The number of elements to skip.
 * @signature
 *    R.drop(array, n)
 * @example
 *    R.drop([1, 2, 3, 4, 5], 2) // => [3, 4, 5]
 * @dataFirst
 * @lazy
 * @category Array
 */
declare function drop<T extends IterableContainer, N extends number>(array: T, n: N): Drop<T, N>;
/**
 * Removes first `n` elements from the `array`.
 *
 * @param n - The number of elements to skip.
 * @signature
 *    R.drop(n)(array)
 * @example
 *    R.drop(2)([1, 2, 3, 4, 5]) // => [3, 4, 5]
 * @dataLast
 * @lazy
 * @category Array
 */
declare function drop<N extends number>(n: N): <T extends IterableContainer>(array: T) => Drop<T, N>;

export { drop };
