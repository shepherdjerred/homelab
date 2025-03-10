/**
 * Merges a list of objects into a single object.
 *
 * @param array - The array of objects.
 * @signature
 *    R.mergeAll(objects)
 * @example
 *    R.mergeAll([{ a: 1, b: 1 }, { b: 2, c: 3 }, { d: 10 }]) // => { a: 1, b: 2, c: 3, d: 10 }
 * @category Array
 */
declare function mergeAll<A>(array: readonly [A]): A;
declare function mergeAll<A, B>(array: readonly [A, B]): A & B;
declare function mergeAll<A, B, C>(array: readonly [A, B, C]): A & B & C;
declare function mergeAll<A, B, C, D>(array: readonly [A, B, C, D]): A & B & C & D;
declare function mergeAll<A, B, C, D, E>(array: readonly [A, B, C, D, E]): A & B & C & D & E;
declare function mergeAll(array: ReadonlyArray<object>): object;

export { mergeAll };
