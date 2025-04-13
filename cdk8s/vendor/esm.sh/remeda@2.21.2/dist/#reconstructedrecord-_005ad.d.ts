import { E as EnumerableStringKeyedValueOf } from './EnumerableStringKeyedValueOf-CLzltniW.d.ts';
import { E as EnumerableStringKeyOf } from './EnumerableStringKeyOf-BQ4aR5ep.d.ts';

/**
 * This is the type you'd get from doing:
 * `Object.fromEntries(Object.entries(x))`.
 */
type ReconstructedRecord<T> = Record<EnumerableStringKeyOf<T>, EnumerableStringKeyedValueOf<T>>;

export type { ReconstructedRecord as R };
