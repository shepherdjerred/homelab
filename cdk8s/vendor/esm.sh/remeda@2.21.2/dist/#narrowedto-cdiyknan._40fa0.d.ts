import { IsAny } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';

/**
 * An extension of Extract for type predicates which falls back to the base
 * in order to narrow the `unknown` case.
 *
 * @example
 *   function isMyType<T>(data: T | MyType): data is NarrowedTo<T, MyType> { ... }
 */
type NarrowedTo<T, Base> = Extract<T, Base> extends never ? Base : IsAny<T> extends true ? Base : Extract<T, Base>;

export type { NarrowedTo as N };
