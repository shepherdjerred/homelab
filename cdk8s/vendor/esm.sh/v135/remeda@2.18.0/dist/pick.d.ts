import { Simplify } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';
import { T as TupleParts } from './TupleParts-CP0H7BrE.d.ts';

type PickFromArray<T, Keys extends ReadonlyArray<keyof T>> = Simplify<Pick<T, TupleParts<Keys>["required"][number] | TupleParts<Keys>["suffix"][number]> & Partial<Pick<T, TupleParts<Keys>["optional"][number] | TupleParts<Keys>["item"]>>>;
/**
 * Creates an object composed of the picked `data` properties.
 *
 * @param keys - The property names.
 * @signature R.pick([prop1, prop2])(object)
 * @example
 *    R.pipe({ a: 1, b: 2, c: 3, d: 4 }, R.pick(['a', 'd'])) // => { a: 1, d: 4 }
 * @dataLast
 * @category Object
 */
declare function pick<T extends object, const Keys extends ReadonlyArray<keyof T>>(keys: Keys): (data: T) => PickFromArray<T, Keys>;
/**
 * Creates an object composed of the picked `data` properties.
 *
 * @param data - The target object.
 * @param keys - The property names.
 * @signature R.pick(object, [prop1, prop2])
 * @example
 *    R.pick({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd']) // => { a: 1, d: 4 }
 * @dataFirst
 * @category Object
 */
declare function pick<T extends object, const Keys extends ReadonlyArray<keyof T>>(data: T, keys: Keys): PickFromArray<T, Keys>;

export { pick };
