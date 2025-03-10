import { CamelCase } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

type CamelCaseOptions = {
    readonly preserveConsecutiveUppercase?: boolean;
};
declare const DEFAULT_OPTIONS: {
    readonly preserveConsecutiveUppercase: true;
};
/**
 * Convert a text to camelCase by splitting it into words, un-capitalizing the
 * first word, capitalizing the rest, then joining them back together. This is
 * the runtime implementation of type-fest's [`CamelCase` type](https://github.com/sindresorhus/type-fest/blob/main/source/camel-case.d.ts).
 *
 * For other case manipulations see: `toLowerCase`, `toUpperCase`, `capitalize`,
 * `uncapitalize`, `toKebabCase`, and `toSnakeCase`.
 *
 * !IMPORTANT: This function might work _incorrectly_ for **non-ascii** inputs.
 *
 * For *PascalCase* use `capitalize(toCamelCase(data))`.
 *
 * @param data - A string.
 * @param options - An _optional_ object with an _optional_ prop
 * `preserveConsecutiveUppercase` that can be used to change the way consecutive
 * uppercase characters are handled. Defaults to `true`.
 * @signature
 *   R.toCamelCase(data);
 *   R.toCamelCase(data, { preserveConsecutiveUppercase });
 * @example
 *   R.toCamelCase("hello world"); // "helloWorld"
 *   R.toCamelCase("__HELLO_WORLD__"); // "helloWorld"
 *   R.toCamelCase("HasHtml"); // "hasHTML"
 *   R.toCamelCase("HasHtml", { preserveConsecutiveUppercase: false }); // "hasHtml"
 * @dataFirst
 * @category String
 */
declare function toCamelCase<T extends string, Options extends CamelCaseOptions = typeof DEFAULT_OPTIONS>(data: T, options?: Options): CamelCase<T, Options>;
/**
 * Convert a text to camelCase by splitting it into words, un-capitalizing the
 * first word, capitalizing the rest, then joining them back together. This is
 * the runtime implementation of type-fest's [`CamelCase` type](https://github.com/sindresorhus/type-fest/blob/main/source/camel-case.d.ts).
 *
 * For other case manipulations see: `toLowerCase`, `toUpperCase`, `capitalize`,
 * `uncapitalize`, `toKebabCase`, and `toSnakeCase`.
 *
 * !IMPORTANT: This function might work _incorrectly_ for **non-ascii** inputs.
 *
 * For *PascalCase* use `capitalize(toCamelCase(data))`.
 *
 * @param options - An _optional_ object with an _optional_ prop
 * `preserveConsecutiveUppercase` that can be used to change the way consecutive
 * uppercase characters are handled. Defaults to `true`.
 * @signature
 *   R.toCamelCase()(data);
 *   R.toCamelCase({ preserveConsecutiveUppercase })(data);
 * @example
 *   R.pipe("hello world", R.toCamelCase()); // "helloWorld"
 *   R.pipe("__HELLO_WORLD__", toCamelCase()); // "helloWorld"
 *   R.pipe("HasHtml", R.toCamelCase()); // "hasHTML"
 *   R.pipe(
 *     "HasHtml",
 *     R.toCamelCase({ preserveConsecutiveUppercase: false }),
 *   ); // "hasHtml"
 * @dataLast
 * @category String
 */
declare function toCamelCase<Options extends CamelCaseOptions = typeof DEFAULT_OPTIONS>(options?: Options): <T extends string>(data: T) => CamelCase<T, Options>;

export { toCamelCase };
