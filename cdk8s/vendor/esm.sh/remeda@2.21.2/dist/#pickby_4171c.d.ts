import { Simplify, IfNever } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import { E as EnumerableStringKeyOf } from './EnumerableStringKeyOf-BQ4aR5ep.d.ts';
import { E as EnumerableStringKeyedValueOf } from './EnumerableStringKeyedValueOf-CLzltniW.d.ts';
import { I as IfBoundedRecord } from './IfBoundedRecord-WIX9x_oz.d.ts';
import { R as ReconstructedRecord } from './ReconstructedRecord-D5917eE2.d.ts';

type EnumerableKey<T> = `${T extends number | string ? T : never}`;
type EnumeratedPartial<T> = T extends unknown ? Simplify<IfBoundedRecord<T, {
    -readonly [P in keyof T as EnumerableKey<P>]?: Required<T>[P];
}, ReconstructedRecord<T>>> : never;
type EnumeratedPartialNarrowed<T, S> = Simplify<ExactProps<T, S> & PartialProps<T, S>>;
type ExactProps<T, S> = {
    -readonly [P in keyof T as EnumerableKey<IsExactProp<T, P, S> extends true ? P : never>]: Extract<Required<T>[P], S>;
};
type PartialProps<T, S> = {
    -readonly [P in keyof T as EnumerableKey<IsPartialProp<T, P, S> extends true ? P : never>]?: IfNever<Extract<T[P], S>, S extends T[P] ? S : never, Extract<T[P], S>>;
};
type IsExactProp<T, P extends keyof T, S> = T[P] extends Extract<T[P], S> ? true : false;
type IsPartialProp<T, P extends keyof T, S> = IsExactProp<T, P, S> extends true ? false : IfNever<Extract<T[P], S>, S extends T[P] ? true : false, true>;
/**
 * Iterates over the entries of `data` and reconstructs the object using only
 * entries that `predicate` accepts. Symbol keys are not passed to the predicate
 * and would be filtered out from the output object.
 *
 * See `omitBy` for a complementary function which starts with a shallow copy of
 * the input object and removes the entries that the predicate rejects. Because
 * it is subtractive symbol keys would be copied over to the output object.
 * See also `entries`, `filter`, and `fromEntries` which could be used to build
 * your own version of `pickBy` if you need more control (though the resulting
 * type might be less precise).
 *
 * @param data - The target object.
 * @param predicate - A function that takes the value, key, and the data itself
 * and returns true if the entry should be part of the output object, or `false`
 * to remove it. If the function is a type-guard on the value the output type
 * would be narrowed accordingly.
 * @returns A shallow copy of the input object with the rejected entries
 * removed.
 * @signature R.pickBy(data, predicate)
 * @example
 *    R.pickBy({a: 1, b: 2, A: 3, B: 4}, (val, key) => key.toUpperCase() === key) // => {A: 3, B: 4}
 * @dataFirst
 * @category Object
 */
declare function pickBy<T extends object, S extends EnumerableStringKeyedValueOf<T>>(data: T, predicate: (value: EnumerableStringKeyedValueOf<T>, key: EnumerableStringKeyOf<T>, data: T) => value is S): EnumeratedPartialNarrowed<T, S>;
declare function pickBy<T extends object>(data: T, predicate: (value: EnumerableStringKeyedValueOf<T>, key: EnumerableStringKeyOf<T>, data: T) => boolean): EnumeratedPartial<T>;
/**
 * Iterates over the entries of `data` and reconstructs the object using only
 * entries that `predicate` accepts. Symbol keys are not passed to the predicate
 * and would be filtered out from the output object.
 *
 * See `omitBy` for a complementary function which starts with a shallow copy of
 * the input object and removes the entries that the predicate rejects. Because
 * it is subtractive symbol keys would be copied over to the output object.
 * See also `entries`, `filter`, and `fromEntries` which could be used to build
 * your own version of `pickBy` if you need more control (though the resulting
 * type might be less precise).
 *
 * @param predicate - A function that takes the value, key, and the data itself
 * and returns true if the entry should be part of the output object, or `false`
 * to remove it. If the function is a type-guard on the value the output type
 * would be narrowed accordingly.
 * @signature
 *   R.pickBy(predicate)(data)
 * @example
 *    R.pipe({a: 1, b: 2, A: 3, B: 4}, pickBy((val, key) => key.toUpperCase() === key)); // => {A: 3, B: 4}
 * @dataLast
 * @category Object
 */
declare function pickBy<T extends object, S extends EnumerableStringKeyedValueOf<T>>(predicate: (value: EnumerableStringKeyedValueOf<T>, key: EnumerableStringKeyOf<T>, data: T) => value is S): (data: T) => EnumeratedPartialNarrowed<T, S>;
declare function pickBy<T extends object>(predicate: (value: EnumerableStringKeyedValueOf<T>, key: EnumerableStringKeyOf<T>, data: T) => boolean): (data: T) => EnumeratedPartial<T>;

export { pickBy };
