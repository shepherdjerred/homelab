import { D as Deduped } from './Deduped-BcgFsruc.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import './NonEmptyArray-C9Od1wmF.d.ts';

type IsEquals<T> = (a: T, b: T) => boolean;
/**
 * Returns a new array containing only one copy of each element in the original
 * list. Elements are compared by custom comparator isEquals.
 *
 * @param data - The array to filter.
 * @param isEquals - The comparator.
 * @signature
 *    R.uniqueWith(array, isEquals)
 * @example
 *    R.uniqueWith(
 *      [{a: 1}, {a: 2}, {a: 2}, {a: 5}, {a: 1}, {a: 6}, {a: 7}],
 *      R.equals,
 *    ) // => [{a: 1}, {a: 2}, {a: 5}, {a: 6}, {a: 7}]
 * @dataFirst
 * @lazy
 * @category Array
 */
declare function uniqueWith<T extends IterableContainer>(data: T, isEquals: IsEquals<T[number]>): Deduped<T>;
/**
 * Returns a new array containing only one copy of each element in the original
 * list. Elements are compared by custom comparator isEquals.
 *
 * @param isEquals - The comparator.
 * @signature R.uniqueWith(isEquals)(array)
 * @example
 *    R.uniqueWith(R.equals)(
 *      [{a: 1}, {a: 2}, {a: 2}, {a: 5}, {a: 1}, {a: 6}, {a: 7}],
 *    ) // => [{a: 1}, {a: 2}, {a: 5}, {a: 6}, {a: 7}]
 *    R.pipe(
 *      [{a: 1}, {a: 2}, {a: 2}, {a: 5}, {a: 1}, {a: 6}, {a: 7}], // only 4 iterations
 *      R.uniqueWith(R.equals),
 *      R.take(3)
 *    ) // => [{a: 1}, {a: 2}, {a: 5}]
 * @dataLast
 * @lazy
 * @category Array
 */
declare function uniqueWith<T extends IterableContainer>(isEquals: IsEquals<T[number]>): (data: T) => Deduped<T>;

export { uniqueWith };
