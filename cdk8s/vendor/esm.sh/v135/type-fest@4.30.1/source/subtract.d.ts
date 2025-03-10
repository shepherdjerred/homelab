import type {NumberAbsolute, BuildTuple} from './internal/index.d.ts';
import type {IsEqual} from './is-equal.d.ts';
import type {PositiveInfinity, NegativeInfinity, IsNegative} from './numeric.d.ts';
import type {LessThan} from './less-than.d.ts';
import type {Sum} from './sum.d.ts';
import type {And} from './and.d.ts';
import type {Or} from './or.d.ts';

/**
Returns the difference between two numbers.

Note:
- A or B can only support `-999` ~ `999`.
- If the result is negative, you can only get `number`.

@example
```
import type {Subtract} from 'type-fest';

Subtract<333, 222>;
//=> 111

Subtract<111, -222>;
//=> 333

Subtract<-111, 222>;
//=> number

Subtract<PositiveInfinity, 9999>;
//=> PositiveInfinity

Subtract<PositiveInfinity, PositiveInfinity>;
//=> number
```

@category Numeric
*/
// TODO: Support big integer and negative number.
export type Subtract<A extends number, B extends number> = number extends A | B
	? number
	: [
		IsEqual<A, PositiveInfinity>, IsEqual<A, NegativeInfinity>,
		IsEqual<B, PositiveInfinity>, IsEqual<B, NegativeInfinity>,
	] extends infer R extends [boolean, boolean, boolean, boolean]
		? Or<
		And<IsEqual<R[0], true>, IsEqual<R[2], false>>,
		And<IsEqual<R[3], true>, IsEqual<R[1], false>>
		> extends true
			? PositiveInfinity
			: Or<
			And<IsEqual<R[1], true>, IsEqual<R[3], false>>,
			And<IsEqual<R[2], true>, IsEqual<R[0], false>>
			> extends true
				? NegativeInfinity
				: true extends R[number]
					? number
					: [IsNegative<A>, IsNegative<B>] extends infer R
						? [false, false] extends R
							? BuildTuple<A> extends infer R
								? R extends [...BuildTuple<B>, ...infer R]
									? R['length']
									: number
								: never
							: LessThan<A, B> extends true
								? number
								: [false, true] extends R
									? Sum<A, NumberAbsolute<B>>
									: Subtract<NumberAbsolute<B>, NumberAbsolute<A>>
						: never
		: never;
