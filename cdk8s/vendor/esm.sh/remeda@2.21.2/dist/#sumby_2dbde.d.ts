import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

type SumBy<T extends IterableContainer, U extends bigint | number> = T extends readonly [] ? 0 : T extends readonly [unknown, ...ReadonlyArray<unknown>] ? U : U | 0;
/**
 * Returns the sum of the elements of an array using the provided mapper.
 *
 * Works for both `number` and `bigint` mappers, but not mappers that return both
 * types.
 *
 * IMPORTANT: The result for empty arrays would be 0 (`number`) regardless of
 * the type of the mapper; to avoid adding this to the return type for cases
 * where the array is known to be non-empty you can use `hasAtLeast` or
 * `isEmpty` to guard against this case.
 *
 * @param callbackfn - Predicate function.
 * @signature
 *   R.sumBy(fn)(array)
 * @example
 *    R.pipe(
 *      [{a: 5}, {a: 1}, {a: 3}],
 *      R.sumBy(x => x.a)
 *    ) // 9
 *
 *    R.pipe(
 *      [{a: 5n}, {a: 1n}, {a: 3n}],
 *      R.sumBy(x => x.a)
 *    ) // 9n
 * @dataLast
 * @category Array
 */
declare function sumBy<T extends IterableContainer>(callbackfn: (value: T[number], index: number, data: T) => number): (items: T) => SumBy<T, number>;
declare function sumBy<T extends IterableContainer>(callbackfn: (value: T[number], index: number, data: T) => bigint): (items: T) => SumBy<T, bigint>;
/**
 * Returns the sum of the elements of an array using the provided mapper.
 *
 * Works for both `number` and `bigint` mappers, but not mappers that can return both
 * types.
 *
 * IMPORTANT: The result for empty arrays would be 0 (`number`) regardless of
 * the type of the mapper; to avoid adding this to the return type for cases
 * where the array is known to be non-empty you can use `hasAtLeast` or
 * `isEmpty` to guard against this case.
 *
 * @param data - The array.
 * @param callbackfn - Predicate function.
 * @signature
 *   R.sumBy(array, fn)
 * @example
 *    R.sumBy(
 *      [{a: 5}, {a: 1}, {a: 3}],
 *      x => x.a
 *    ) // 9
 *    R.sumBy(
 *      [{a: 5n}, {a: 1n}, {a: 3n}],
 *      x => x.a
 *    ) // 9n
 * @dataFirst
 * @category Array
 */
declare function sumBy<T extends IterableContainer>(data: T, callbackfn: (value: T[number], index: number, data: T) => number): SumBy<T, number>;
declare function sumBy<T extends IterableContainer>(data: T, callbackfn: (value: T[number], index: number, data: T) => bigint): SumBy<T, bigint>;

export { sumBy };
