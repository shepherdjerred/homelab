import { LastArrayElement } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

type Last<T extends IterableContainer> = LastArrayElement<T, T extends readonly [] ? never : undefined>;
/**
 * Gets the last element of `array`.
 *
 * @param data - The array.
 * @signature
 *    R.last(array)
 * @example
 *    R.last([1, 2, 3]) // => 3
 *    R.last([]) // => undefined
 * @dataFirst
 * @category Array
 */
declare function last<T extends IterableContainer>(data: T): Last<T>;
/**
 * Gets the last element of `array`.
 *
 * @signature
 *    R.last()(array)
 * @example
 *    R.pipe(
 *      [1, 2, 4, 8, 16],
 *      R.filter(x => x > 3),
 *      R.last(),
 *      x => x + 1
 *    ); // => 17
 * @dataLast
 * @category Array
 */
declare function last(): <T extends IterableContainer>(data: T) => Last<T>;

export { last };
