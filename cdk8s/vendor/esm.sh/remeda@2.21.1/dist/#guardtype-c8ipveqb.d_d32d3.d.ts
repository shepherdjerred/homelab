/**
 * Extracts a type predicate from a type guard function for the first argument.
 *
 * @example
 * type TypeGuardFn = (x: unknown) => x is string;
 * type Result = GuardType<TypeGuardFn>; // `string`
 */
type GuardType<T, Fallback = never> = T extends (x: any, ...rest: any) => x is infer U ? U : Fallback;

export type { GuardType as G };
