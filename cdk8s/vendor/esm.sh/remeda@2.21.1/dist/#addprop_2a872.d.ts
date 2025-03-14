import { U as UpsertProp } from './UpsertProp-Df3Rulpq.d.ts';
import 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import './IsUnion-Bx34mF34.d.ts';

/**
 * Add a new property to an object.
 *
 * The function doesn't do any checks on the input object. If the property
 * already exists it will be overwritten, and the type of the new value is not
 * checked against the previous type.
 *
 * Use `set` to override values explicitly with better protections.
 *
 * @param obj - The target object.
 * @param prop - The property name.
 * @param value - The property value.
 * @signature
 *    R.addProp(obj, prop, value)
 * @example
 *    R.addProp({firstName: 'john'}, 'lastName', 'doe') // => {firstName: 'john', lastName: 'doe'}
 * @dataFirst
 * @category Object
 */
declare function addProp<T, K extends PropertyKey, V>(obj: T, prop: K, value: V): UpsertProp<T, K, V>;
/**
 * Add a new property to an object.
 *
 * The function doesn't do any checks on the input object. If the property
 * already exists it will be overwritten, and the type of the new value is not
 * checked against the previous type.
 *
 * Use `set` to override values explicitly with better protections.
 *
 * @param prop - The property name.
 * @param value - The property value.
 * @signature
 *    R.addProp(prop, value)(obj)
 * @example
 *    R.addProp('lastName', 'doe')({firstName: 'john'}) // => {firstName: 'john', lastName: 'doe'}
 * @dataLast
 * @category Object
 */
declare function addProp<T, K extends PropertyKey, V>(prop: K, value: V): (obj: T) => UpsertProp<T, K, V>;

export { addProp };
