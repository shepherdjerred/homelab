import { Join, Words } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';

type KebabCase<S extends string> = string extends S ? string : Lowercase<Join<Words<S>, "-">>;
/**
 * Convert a text to kebab-Case by splitting it into words and joining them back
 * together with "-", and then lowering the case of the result.
 *
 * For other case manipulations see: `toLowerCase`, `toUpperCase`, `capitalize`,
 * `uncapitalize`, and `toCamelCase`.
 *
 * !IMPORTANT: This function might work _incorrectly_ for **non-ascii** inputs.
 *
 * @param data - A string.
 * @signature
 *   R.toKebabCase(data);
 * @example
 *   R.toKebabCase("hello world"); // "hello-world"
 *   R.toKebabCase("__HELLO_WORLD__"); // "hello-world"
 * @dataFirst
 * @category String
 */
declare function toKebabCase<S extends string>(data: S): KebabCase<S>;
/**
 * Convert a text to kebabCase by splitting it into words and joining them back
 * together with "-", and then lowering the case of the result.
 *
 * For other case manipulations see: `toLowerCase`, `toUpperCase`, `capitalize`,
 * `uncapitalize`, and `toCamelCase`.
 *
 * !IMPORTANT: This function might work _incorrectly_ for **non-ascii** inputs.
 *
 * @signature
 *   R.toKebabCase()(data);
 * @example
 *   R.pipe("hello world", R.toKebabCase()); // "hello-world"
 *   R.pipe("__HELLO_WORLD__", toKebabCase()); // "hello-world"
 * @dataLast
 * @category String
 */
declare function toKebabCase(): <S extends string>(data: S) => KebabCase<S>;

export { toKebabCase };
