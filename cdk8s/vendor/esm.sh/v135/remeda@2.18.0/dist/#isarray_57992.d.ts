import { N as NarrowedTo } from './NarrowedTo-CDIykNaN.d.ts';
import 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

/**
 * A function that checks if the passed parameter is an Array and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is an Array, false otherwise.
 * @signature
 *    R.isArray(data)
 * @example
 *    R.isArray([5]) //=> true
 *    R.isArray([]) //=> true
 *    R.isArray('somethingElse') //=> false
 * @category Guard
 */
declare function isArray<T>(data: ArrayLike<unknown> | T): data is NarrowedTo<T, ReadonlyArray<unknown>>;

export { isArray };
