import { Simplify, Writable, IsLiteral } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';
import { I as IsUnion } from './IsUnion-Bx34mF34.d.ts';

type UpsertProp<T, K extends PropertyKey, V> = Simplify<Omit<T, K> & (IsSingleLiteral<K> extends true ? Writable<Required<Record<K, V>>> : // ('cat' | 'dog') so we can't say anything for sure, we need to narrow
{
    -readonly [P in keyof T as P extends K ? P : never]: T[P] | V;
} & {
    -readonly [P in K as P extends keyof T ? never : P]?: V;
})>;
type IsSingleLiteral<K> = IsLiteral<K> extends true ? (IsUnion<K> extends true ? false : true) : false;

export type { UpsertProp as U };
