import { DistributeMatchingUnions } from './DistributeUnions.d.ts';
export type DeepExclude<a, b> = Exclude<DistributeMatchingUnions<a, b>, b>;
