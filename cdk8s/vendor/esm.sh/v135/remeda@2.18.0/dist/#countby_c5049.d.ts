import { E as ExactRecord } from './ExactRecord-D_crnhD3.d.ts';
import './IfBoundedRecord-CWXFCISn.d.ts';
import 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

/**
 * Categorize and count elements in an array using a defined callback function.
 * The callback function is applied to each element in the array to determine
 * its category and then counts how many elements fall into each category.
 *
 * @param data - The array.
 * @param categorizationFn - The categorization function.
 * @signature
 *   R.countBy(data, categorizationFn)
 * @example
 *    R.countBy(
 *      ["a", "b", "c", "B", "A", "a"],
 *      R.toLowerCase()
 *    ); //=> { a: 3, b: 2, c: 1 }
 * @dataFirst
 * @category Array
 */
declare function countBy<T, K extends PropertyKey>(data: ReadonlyArray<T>, categorizationFn: (value: T, index: number, data: ReadonlyArray<T>) => K | undefined): ExactRecord<K, number>;
/**
 * Categorize and count elements in an array using a defined callback function.
 * The callback function is applied to each element in the array to determine
 * its category and then counts how many elements fall into each category.
 *
 * @param categorizationFn - The categorization function.
 * @signature
 *   R.countBy(categorizationFn)(data)
 * @example
 *    R.pipe(
 *      ["a", "b", "c", "B", "A", "a"],
 *      R.countBy(R.toLowerCase()),
 *    ); //=> { a: 3, b: 2, c: 1 }
 * @dataLast
 * @category Array
 */
declare function countBy<T, K extends PropertyKey>(categorizationFn: (value: T, index: number, data: ReadonlyArray<T>) => K | undefined): (data: ReadonlyArray<T>) => ExactRecord<K, number>;

export { countBy };
