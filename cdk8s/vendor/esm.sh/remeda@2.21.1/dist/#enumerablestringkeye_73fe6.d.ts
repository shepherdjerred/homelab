import { EmptyObject } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';

/**
 * A union of all values of properties in T which are not keyed by a symbol,
 * following the definition of `Object.values` and `Object.entries`.
 */
type EnumerableStringKeyedValueOf<T> = ValuesOf<{
    [K in keyof T]-?: K extends symbol ? never : T[K];
}>;
/**
 * Extracts the value type from an object type T.
 */
type ValuesOf<T> = T extends EmptyObject ? T[keyof T] : T extends Record<PropertyKey, infer V> ? V : never;

export type { EnumerableStringKeyedValueOf as E };
