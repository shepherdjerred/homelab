import { IsNumericLiteral, LessThan, IfNever, ValueOf, Subtract, IntRange } from 'https://esm.sh/v135/type-fest@4.30.1/index.d.ts';
import { I as IntRangeInclusive } from './IntRangeInclusive-Cn-qsrAN.d.ts';
import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import { N as NonEmptyArray } from './NonEmptyArray-C9Od1wmF.d.ts';
import { N as NTuple } from './NTuple-BgsZT9dJ.d.ts';
import { T as TupleParts } from './TupleParts-CP0H7BrE.d.ts';

type MAX_LITERAL_SIZE = 350;
type Chunk<T extends IterableContainer, N extends number> = T extends readonly [] ? [] : IsNumericLiteral<N> extends true ? LessThan<N, 1> extends true ? never : LessThan<N, MAX_LITERAL_SIZE> extends true ? [
    ...LiteralChunk<T, N>
] : GenericChunk<T> : GenericChunk<T>;
type LiteralChunk<T, N extends number, Parts extends TupleParts<T> = TupleParts<T>> = ChunkInfinite<ChunkFinite<Parts["prefix"], N>, Parts["item"], Parts["suffix"], N> | ([...Parts["prefix"], ...Parts["suffix"]]["length"] extends 0 ? [] : never);
/**
 * This type **only** works if the input array `T` is a finite tuple (
 * `[number, "abc", true, { a: "hello" }]` etc..., and it doesn't contain a rest
 * parameter). For these inputs the chunked output could be computed as literal
 * finite tuples too.
 */
type ChunkFinite<T, N extends number, Result = []> = T extends readonly [infer Head, ...infer Rest] ? ChunkFinite<Rest, N, Result extends [
    ...infer Previous extends Array<Array<unknown>>,
    infer Current extends Array<unknown>
] ? Current["length"] extends N ? [
    ...Previous,
    Current,
    [Head]
] : [
    ...Previous,
    [...Current, Head]
] : [
    [Head]
]> : Result;
/**
 * Here lies the main complexity of building the chunk type. It takes the prefix
 * chunks, the rest param item type, and the suffix (not chunked!) and it
 * creates all possible combinations of adding items to the prefix and suffix
 * for all possible scenarios for how many items the rest param "represents".
 */
type ChunkInfinite<PrefixChunks, Item, Suffix extends Array<unknown>, N extends number> = IfNever<Item, PrefixChunks, PrefixChunks extends [
    ...infer PrefixFullChunks extends Array<Array<unknown>>,
    infer LastPrefixChunk extends Array<unknown>
] ? ValueOf<{
    [Padding in IntRangeInclusive<0, Subtract<N, LastPrefixChunk["length"]>>]: [
        ...PrefixFullChunks,
        ...ChunkFinite<[
            ...LastPrefixChunk,
            ...NTuple<Item, Padding>,
            ...Suffix
        ], N>
    ];
}> | [
    ...PrefixFullChunks,
    [
        ...LastPrefixChunk,
        ...NTuple<Item, Subtract<N, LastPrefixChunk["length"]>>
    ],
    ...Array<NTuple<Item, N>>,
    ...SuffixChunk<Suffix, Item, N>
] : [
    ...Array<NTuple<Item, N>>,
    ...SuffixChunk<Suffix, Item, N>
]>;
/**
 * This type assumes it takes a finite tuple that represents the suffix of our
 * input array. It builds all possible combinations of adding items to the
 * **head** of the suffix in order to pad the suffix until the last chunk is
 * full.
 */
type SuffixChunk<T extends Array<unknown>, Item, N extends number> = T extends readonly [] ? [
    ValueOf<{
        [K in IntRangeInclusive<1, N>]: NTuple<Item, K>;
    }>
] : ValueOf<{
    [Padding in IntRange<0, N>]: ChunkFinite<[
        ...NTuple<Item, Padding>,
        ...T
    ], N>;
}>;
/**
 * This is the legacy type used when we don't know what N is. We can only adjust
 * our output based on if we know for sure that the array is empty or not.
 */
type GenericChunk<T extends IterableContainer> = T extends readonly [...Array<unknown>, unknown] | readonly [unknown, ...Array<unknown>] ? NonEmptyArray<NonEmptyArray<T[number]>> : Array<NonEmptyArray<T[number]>>;
/**
 * Split an array into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param array - The array.
 * @param size - The length of the chunk.
 * @signature
 *    R.chunk(array, size)
 * @example
 *    R.chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]
 *    R.chunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
 * @dataFirst
 * @category Array
 */
declare function chunk<T extends IterableContainer, N extends number>(array: T, size: N): Chunk<T, N>;
/**
 * Split an array into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param size - The length of the chunk.
 * @signature
 *    R.chunk(size)(array)
 * @example
 *    R.chunk(2)(['a', 'b', 'c', 'd']) // => [['a', 'b'], ['c', 'd']]
 *    R.chunk(3)(['a', 'b', 'c', 'd']) // => [['a', 'b', 'c'], ['d']]
 * @dataLast
 * @category Array
 */
declare function chunk<N extends number>(size: N): <T extends IterableContainer>(array: T) => Chunk<T, N>;

export { chunk };
