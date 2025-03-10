import { N as NarrowedTo } from './NarrowedTo-CDIykNaN.d.ts';
import 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

/**
 * A function that checks if the passed parameter is a symbol and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is a symbol, false otherwise.
 * @signature
 *    R.isSymbol(data)
 * @example
 *    R.isSymbol(Symbol('foo')) //=> true
 *    R.isSymbol(1) //=> false
 * @category Guard
 */
declare function isSymbol<T>(data: T | symbol): data is NarrowedTo<T, symbol>;

export { isSymbol };
