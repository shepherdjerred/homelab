import { U as UpsertProp } from './UpsertProp-Df3Rulpq.d.ts';
import 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import './IsUnion-Bx34mF34.d.ts';

/**
 * Sets the `value` at `prop` of `object`.
 *
 * To add a new property to an object, or to override its type, use `addProp`
 * instead, and to set a property within a nested object use `setPath`.
 *
 * @param obj - The target method.
 * @param prop - The property name.
 * @param value - The value to set.
 * @signature
 *    R.set(obj, prop, value)
 * @example
 *    R.set({ a: 1 }, 'a', 2) // => { a: 2 }
 * @dataFirst
 * @category Object
 */
declare function set<T, K extends keyof T, V extends Required<T>[K]>(obj: T, prop: K, value: V): UpsertProp<T, K, V>;
/**
 * Sets the `value` at `prop` of `object`.
 *
 * To add a new property to an object, or to override it's type use `addProp`
 * instead.
 *
 * @param prop - The property name.
 * @param value - The value to set.
 * @signature
 *    R.set(prop, value)(obj)
 * @example
 *    R.pipe({ a: 1 }, R.set('a', 2)) // => { a: 2 }
 * @dataLast
 * @category Object
 */
declare function set<T, K extends keyof T, V extends Required<T>[K]>(prop: K, value: V): (obj: T) => UpsertProp<T, K, V>;

export { set };
