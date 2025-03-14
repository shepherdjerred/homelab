import { IsNever } from 'https://esm.sh/type-fest@4.37.0/index.d.ts';

type IsUnion<T> = InternalIsUnion<T>;
type InternalIsUnion<T, U = T> = (IsNever<T> extends true ? false : T extends any ? [U] extends [T] ? false : true : never) extends infer Result ? boolean extends Result ? true : Result : never;

export type { IsUnion as I };
