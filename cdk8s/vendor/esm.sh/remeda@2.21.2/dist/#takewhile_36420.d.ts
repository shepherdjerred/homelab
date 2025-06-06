import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

/**
 * Returns elements from the array until predicate returns false.
 *
 * @param data - The array.
 * @param predicate - The predicate.
 * @signature
 *    R.takeWhile(data, predicate)
 * @example
 *    R.takeWhile([1, 2, 3, 4, 3, 2, 1], x => x !== 4) // => [1, 2, 3]
 * @dataFirst
 * @category Array
 */
declare function takeWhile<T extends IterableContainer>(data: T, predicate: (item: T[number], index: number, data: T) => boolean): Array<T[number]>;
/**
 * Returns elements from the array until predicate returns false.
 *
 * @param predicate - The predicate.
 * @signature
 *    R.takeWhile(predicate)(data)
 * @example
 *    R.pipe([1, 2, 3, 4, 3, 2, 1], R.takeWhile(x => x !== 4))  // => [1, 2, 3]
 * @dataLast
 * @category Array
 */
declare function takeWhile<T extends IterableContainer>(predicate: (item: T[number], index: number, data: T) => boolean): (array: T) => Array<T[number]>;

export { takeWhile };
