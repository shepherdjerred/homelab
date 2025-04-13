/**
 * Random a non-cryptographic random string from characters a-zA-Z0-9.
 *
 * @param length - The length of the random string.
 * @returns The random string.
 * @signature
 *   R.randomString(length)
 * @example
 *   R.randomString(5) // => aB92J
 * @dataFirst
 * @category String
 */
declare function randomString(length: number): string;
/**
 * Random a non-cryptographic random string from characters a-zA-Z0-9.
 *
 * @returns The random string.
 * @signature
 *   R.randomString()(length)
 * @example
 *   R.pipe(5, R.randomString()) // => aB92J
 * @dataLast
 * @category String
 */
declare function randomString(): (length: number) => string;

export { randomString };
