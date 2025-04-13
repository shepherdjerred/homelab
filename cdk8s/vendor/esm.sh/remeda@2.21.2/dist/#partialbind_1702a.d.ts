import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';
import { R as RemedaTypeError } from './RemedaTypeError-C4mozr3m.d.ts';
import { T as TupleSplits } from './TupleSplits-eRE__Ilo.d.ts';
import 'https://esm.sh/type-fest@4.37.0/index.d.ts';
import './TupleParts-CP0H7BrE.d.ts';
import './CoercedArray-DRz3tqda.d.ts';

type PartialBindError<Message extends string | number> = RemedaTypeError<"partialBind", Message>;
type TuplePrefix<T extends IterableContainer> = TupleSplits<T>["left"];
type RemovePrefix<T extends IterableContainer, Prefix extends TuplePrefix<T>> = Prefix extends readonly [] ? T : T extends readonly [infer THead, ...infer TRest] ? Prefix extends readonly [infer _PrefixHead, ...infer PrefixRest] ? RemovePrefix<TRest, PrefixRest> : [
    THead?,
    ...RemovePrefix<TRest, Prefix>
] : T extends readonly [(infer _THead)?, ...infer TRest] ? Prefix extends readonly [infer _PrefixHead, ...infer PrefixRest] ? RemovePrefix<TRest, PrefixRest> : TRest : PartialBindError<1>;
/**
 * Creates a function that calls `func` with `partial` put before the arguments
 * it receives.
 *
 * Can be thought of as "freezing" some portion of a function's arguments,
 * resulting in a new function with a simplified signature.
 *
 * @param func - The function to wrap.
 * @param partial - The arguments to put before.
 * @returns A partially bound function.
 * @signature
 *    R.partialBind(func, partial)
 * @example
 *    const fn = (x, y, z) => `${x}, ${y}, and ${z}`
 *    const partialFn = R.partialBind(fn, [1, 2])
 *    partialFn(3) // => 1, 2, and 3
 *
 *    const logWithPrefix = R.partialBind(console.log, ["[prefix]"])
 *    logWithPrefix("hello") // => "[prefix] hello"
 * @dataFirst
 * @category Function
 * @see partialLastBind
 */
declare function partialBind<F extends (...args: any) => any, PrefixArgs extends TuplePrefix<Parameters<F>>, RemovedPrefix extends RemovePrefix<Parameters<F>, PrefixArgs>>(func: F, ...partial: PrefixArgs): (...rest: RemovedPrefix extends IterableContainer ? RemovedPrefix : never) => ReturnType<F>;

export { partialBind };
