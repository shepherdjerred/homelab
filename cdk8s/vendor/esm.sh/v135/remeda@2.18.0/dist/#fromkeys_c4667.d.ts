import { Simplify } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';
import { E as ExactRecord } from './ExactRecord-D_crnhD3.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import './IfBoundedRecord-CWXFCISn.d.ts';

type ExactlyOneKey<T, V> = T extends PropertyKey ? Record<T, V> : never;
type FromKeys<T extends IterableContainer, V> = T extends readonly [] ? {} : T extends readonly [infer Head, ...infer Rest] ? ExactlyOneKey<Head, V> & FromKeys<Rest, V> : T[number] extends PropertyKey ? ExactRecord<T[number], V> : never;
/**
 * Creates an object that maps each key in `data` to the result of `mapper` for
 * that key. Duplicate keys are overwritten, guaranteeing that `mapper` is run
 * for each item in `data`.
 *
 * There are several other functions that could be used to build an object from
 * an array:
 * * `indexBy` - Builds an object from an array of *values* and a mapper for keys.
 * * `pullObject` - Builds an object from an array of items with mappers for *both* keys and values.
 * * `fromEntries` - Builds an object from an array of key-value pairs.
 * * `mapToObj` - Builds an object from an array of items and a single mapper for key-value pairs.
 * Refer to the docs for more details.
 *
 * @param data - An array of keys of the output object. All items in the array
 * would be keys in the output array.
 * @param mapper - Takes a key and returns the value that would be associated
 * with that key.
 * @signature
 *   R.fromKeys(data, mapper);
 * @example
 *   R.fromKeys(["cat", "dog"], R.length()); // { cat: 3, dog: 3 } (typed as Partial<Record<"cat" | "dog", number>>)
 *   R.fromKeys([1, 2], R.add(1)); // { 1: 2, 2: 3 } (typed as Partial<Record<1 | 2, number>>)
 * @dataFirst
 * @category Object
 */
declare function fromKeys<T extends IterableContainer<PropertyKey>, V>(data: T, mapper: (item: T[number], index: number, data: T) => V): Simplify<FromKeys<T, V>>;
/**
 * Creates an object that maps each key in `data` to the result of `mapper` for
 * that key. Duplicate keys are overwritten, guaranteeing that `mapper` is run
 * for each item in `data`.
 *
 * There are several other functions that could be used to build an object from
 * an array:
 * * `indexBy` - Builds an object from an array of *values* and a mapper for keys.
 * * `pullObject` - Builds an object from an array of items with mappers for *both* keys and values.
 * * `fromEntries` - Builds an object from an array of key-value pairs.
 * * `mapToObj` - Builds an object from an array of items and a single mapper for key-value pairs.
 * Refer to the docs for more details.
 *
 * @param mapper - Takes a key and returns the value that would be associated
 * with that key.
 * @signature
 *   R.fromKeys(mapper)(data);
 * @example
 *   R.pipe(["cat", "dog"], R.fromKeys(R.length())); // { cat: 3, dog: 3 } (typed as Partial<Record<"cat" | "dog", number>>)
 *   R.pipe([1, 2], R.fromKeys(R.add(1))); // { 1: 2, 2: 3 } (typed as Partial<Record<1 | 2, number>>)
 * @dataLast
 * @category Object
 */
declare function fromKeys<T extends IterableContainer<PropertyKey>, V>(mapper: (item: T[number], index: number, data: T) => V): (data: T) => Simplify<FromKeys<T, V>>;

export { fromKeys };
