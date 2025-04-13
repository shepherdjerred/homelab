import { Simplify } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';

type Inverted<T extends object> = Simplify<{
    -readonly [K in keyof T as K extends number | string ? Required<T>[K] extends PropertyKey ? Required<T>[K] : never : never]: `${K extends number | string ? K : never}`;
}>;
/**
 * Returns an object whose keys and values are swapped. If the object contains duplicate values,
 * subsequent values will overwrite previous values.
 *
 * @param object - The object.
 * @signature
 *    R.invert(object)
 * @example
 *    R.invert({ a: "d", b: "e", c: "f" }) // => { d: "a", e: "b", f: "c" }
 * @dataFirst
 * @category Object
 */
declare function invert<T extends object>(object: T): Inverted<T>;
/**
 * Returns an object whose keys and values are swapped. If the object contains duplicate values,
 * subsequent values will overwrite previous values.
 *
 * @signature
 *    R.invert()(object)
 * @example
 *    R.pipe({ a: "d", b: "e", c: "f" }, R.invert()); // => { d: "a", e: "b", f: "c" }
 * @dataLast
 * @category Object
 */
declare function invert<T extends object>(): (object: T) => Inverted<T>;

export { invert };
