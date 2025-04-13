declare const COMPARATORS: {
    readonly asc: <T>(x: T, y: T) => boolean;
    readonly desc: <T>(x: T, y: T) => boolean;
};
/**
 * An order rule defines a projection/extractor that returns a comparable from
 * the data being compared. It would be run on each item being compared, and a
 * comparator would then be used on the results to determine the order.
 *
 * There are 2 forms of the order rule, a simple one which only provides the
 * projection function and assumes ordering is ascending, and a 2-tuple where
 * the first element is the projection function and the second is the direction;
 * this allows changing the direction without defining a more complex projection
 * to simply negate the value (e.g. `(x) => -x`).
 *
 * We rely on the javascript implementation of `<` and `>` for comparison, which
 * will attempt to transform both operands into a primitive comparable value via
 * the built in `valueOf` function (and then `toString`). It's up to the caller
 * to make sure that the projection is returning a value that makes sense for
 * this logic.
 *
 * It's important to note that there is no built-in caching/memoization of
 * projection function and therefore no guarantee that it would only be called
 * once.
 */
type OrderRule<T> = Projection<T> | readonly [projection: Projection<T>, direction: keyof typeof COMPARATORS];
type Projection<T> = (x: T) => Comparable;
type Comparable = ComparablePrimitive | {
    [Symbol.toPrimitive]: (hint: string) => ComparablePrimitive;
} | {
    toString: () => string;
} | {
    valueOf: () => ComparablePrimitive;
};
type ComparablePrimitive = bigint | boolean | number | string;

export type { OrderRule as O };
