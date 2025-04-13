import { N as NarrowedTo } from './NarrowedTo-CDIykNaN.d.ts';
import 'https://esm.sh/type-fest@4.37.0/index.d.ts';

/**
 * A function that checks if the passed parameter is a Promise and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is a Promise, false otherwise.
 * @signature
 *    R.isPromise(data)
 * @example
 *    R.isPromise(Promise.resolve(5)) //=> true
 *    R.isPromise(Promise.reject(5)) //=> true
 *    R.isPromise('somethingElse') //=> false
 * @category Guard
 */
declare function isPromise<T>(data: Readonly<PromiseLike<unknown>> | T): data is NarrowedTo<T, PromiseLike<unknown>>;

export { isPromise };
