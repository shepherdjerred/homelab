import { IfNever } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

/**
 * `never[]` and `[]` are not the same type, and in some cases they aren't
 * interchangeable.
 *
 * This type makes it easier to use the result of TupleParts when the input is a
 * fixed-length tuple but we still want to spread the rest of the array. e.g.
 * `[...CoercedArray<TupleParts<T>["item"]>, ...TupleParts<T>["suffix"]]`.
 *
 */
type CoercedArray<T> = IfNever<T, [], Array<T>>;

export type { CoercedArray as C };
