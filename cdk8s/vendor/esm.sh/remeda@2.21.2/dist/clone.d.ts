/**
 * Creates a deep copy of the value. Supported types: [plain objects](#isPlainObject),
 * `Array`, `number`, `string`, `boolean`, `Date`, and `RegExp`. Functions are
 * assigned by reference rather than copied. Class instances or any other
 * built-in type that isn't mentioned above are not supported (but might
 * work).
 *
 * @param data - The object to clone.
 * @signature
 *   R.clone(data)
 * @example
 *   R.clone({foo: 'bar'}) // {foo: 'bar'}
 * @dataFirst
 * @category Object
 */
declare function clone<T>(data: T): T;
/**
 * Creates a deep copy of the value. Supported types: [plain objects](#isPlainObject),
 * `Array`, `number`, `string`, `boolean`, `Date`, and `RegExp`. Functions are
 * assigned by reference rather than copied. Class instances or any other
 * built-in type that isn't mentioned above are not supported (but might
 * work).
 *
 * @signature
 *   R.clone()(data)
 * @example
 *   R.pipe({foo: 'bar'}, R.clone()) // {foo: 'bar'}
 * @dataLast
 * @category Object
 */
declare function clone(): <T>(data: T) => T;

export { clone };
