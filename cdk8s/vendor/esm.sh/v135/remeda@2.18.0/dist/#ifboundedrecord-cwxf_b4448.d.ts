import { KeysOfUnion, IsStringLiteral, IsNumericLiteral, IsSymbolLiteral, Split } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

/**
 * Check if a type is guaranteed to be a bounded record: a record with a finite
 * set of keys.
 *
 * @example
 *     IfBoundedRecord<{ a: 1, 1: "a" }>; //=> true
 *     IfBoundedRecord<Record<string | number, unknown>>; //=> false
 *     IfBoundedRecord<Record<`prefix_${number}`, unknown>>; //=> false
 */
type IfBoundedRecord<T, TypeIfBoundedRecord = true, TypeIfUnboundedRecord = false> = IsBoundedKey<KeysOfUnion<T>> extends true ? TypeIfBoundedRecord : TypeIfUnboundedRecord;
/**
 * Checks if a type is a bounded key: a union of bounded strings, numeric
 * literals, or symbol literals.
 */
type IsBoundedKey<T> = T extends unknown ? IsStringLiteral<T> extends true ? IsBoundedString<T> : IsNumericLiteral<T> extends true ? true : IsSymbolLiteral<T> : never;
/**
 * Checks if a type is a bounded string: a type that only has a finite
 * number of strings that are that type.
 *
 * Most relevant for template literals: IsBoundedString<`${1 | 2}_${3 | 4}`> is
 * true, and IsBoundedString<`${1 | 2}_${number}`> is false.
 */
type IsBoundedString<T> = T extends string ? Split<T, "">[number] extends infer U ? [
    `${number}`
] extends [U] ? false : [string] extends [U] ? false : true : false : false;

export type { IfBoundedRecord as I };
