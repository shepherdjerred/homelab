import { E as ExactRecord } from './ExactRecord-or8-oNP7.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import './IfBoundedRecord-WIX9x_oz.d.ts';
import 'https://esm.sh/type-fest@4.37.0/index.d.ts';

/**
 * Creates an object that maps the result of `valueExtractor` with a key
 * resulting from running `keyExtractor` on each item in `data`. Duplicate keys
 * are overwritten, guaranteeing that the extractor functions are run on each
 * item in `data`.
 *
 * There are several other functions that could be used to build an object from
 * an array:
 * * `fromKeys` - Builds an object from an array of *keys* and a mapper for values.
 * * `indexBy` - Builds an object from an array of *values* and a mapper for keys.
 * * `fromEntries` - Builds an object from an array of key-value pairs.
 * * `mapToObj` - Builds an object from an array of items and a single mapper for key-value pairs.
 * Refer to the docs for more details.
 *
 * @param data - The items used to pull/extract the keys and values from.
 * @param keyExtractor - Computes the key for item.
 * @param valueExtractor - Computes the value for the item.
 * @signature
 *   R.pullObject(data, keyExtractor, valueExtractor);
 * @example
 *   R.pullObject(
 *     [
 *       { name: "john", email: "john@remedajs.com" },
 *       { name: "jane", email: "jane@remedajs.com" }
 *     ],
 *     R.prop("name"),
 *     R.prop("email"),
 *   ); // => { john: "john@remedajs.com", jane: "jane@remedajs.com" }
 * @dataFirst
 * @category Object
 */
declare function pullObject<T extends IterableContainer, K extends PropertyKey, V>(data: T, keyExtractor: (item: T[number], index: number, data: T) => K, valueExtractor: (item: T[number], index: number, data: T) => V): ExactRecord<K, V>;
/**
 * Creates an object that maps the result of `valueExtractor` with a key
 * resulting from running `keyExtractor` on each item in `data`. Duplicate keys
 * are overwritten, guaranteeing that the extractor functions are run on each
 * item in `data`.
 *
 * There are several other functions that could be used to build an object from
 * an array:
 * * `fromKeys` - Builds an object from an array of *keys* and a mapper for values.
 * * `indexBy` - Builds an object from an array of *values* and a mapper for keys.
 * * `fromEntries` - Builds an object from an array of key-value pairs.
 * * `mapToObj` - Builds an object from an array of items and a single mapper for key-value pairs.
 * Refer to the docs for more details.
 *
 * @param keyExtractor - Computes the key for item.
 * @param valueExtractor - Computes the value for the item.
 * @signature
 *   R.pullObject(keyExtractor, valueExtractor)(data);
 * @example
 *   R.pipe(
 *     [
 *       { name: "john", email: "john@remedajs.com" },
 *       { name: "jane", email: "jane@remedajs.com" }
 *     ],
 *     R.pullObject(R.prop("email"), R.prop("name")),
 *   ); // => { john: "john@remedajs.com", jane: "jane@remedajs.com" }
 * @dataLast
 * @category Object
 */
declare function pullObject<T extends IterableContainer, K extends PropertyKey, V>(keyExtractor: (item: T[number], index: number, data: T) => K, valueExtractor: (item: T[number], index: number, data: T) => V): (data: T) => ExactRecord<K, V>;

export { pullObject };
