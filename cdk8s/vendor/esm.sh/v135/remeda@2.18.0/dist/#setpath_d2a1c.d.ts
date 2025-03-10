type Path<T, Prefix extends ReadonlyArray<unknown> = []> = T extends ReadonlyArray<unknown> ? Path<T[number], [...Prefix, number]> | Prefix : T extends Record<PropertyKey, unknown> ? PathsOfObject<T, Prefix> | Prefix : Prefix;
type PathsOfObject<T, Prefix extends ReadonlyArray<unknown>> = {
    [K in keyof T]-?: Path<T[K], readonly [...Prefix, K]>;
}[keyof T];
type ValueAtPath<T, TPath> = TPath extends readonly [
    infer Head extends keyof T,
    ...infer Rest
] ? ValueAtPath<T[Head], Rest> : T;
/**
 * Sets the value at `path` of `object`.
 *
 * For simple cases where the path is only one level deep, prefer `set` instead.
 *
 * @param data - The target method.
 * @param path - The array of properties.
 * @param value - The value to set.
 * @signature
 *    R.setPath(obj, path, value)
 * @example
 *    R.setPath({ a: { b: 1 } }, ['a', 'b'], 2) // => { a: { b: 2 } }
 * @dataFirst
 * @category Object
 */
declare function setPath<T, TPath extends Path<T>>(data: T, path: TPath, value: ValueAtPath<T, TPath>): T;
/**
 * Sets the value at `path` of `object`.
 *
 * @param path - The array of properties.
 * @param value - The value to set.
 * @signature
 *    R.setPath(path, value)(obj)
 * @example
 *    R.pipe({ a: { b: 1 } }, R.setPath(['a', 'b'], 2)) // { a: { b: 2 } }
 * @dataLast
 * @category Object
 */
declare function setPath<T, TPath extends Path<T>, Value extends ValueAtPath<T, TPath>>(path: TPath, value: Value): (data: T) => T;
declare function setPathImplementation(data: unknown, path: ReadonlyArray<PropertyKey>, value: unknown): unknown;

export { setPath, setPathImplementation };
