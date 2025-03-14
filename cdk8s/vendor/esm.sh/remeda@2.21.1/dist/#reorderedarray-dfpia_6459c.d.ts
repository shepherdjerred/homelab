import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

type ReorderedArray<T extends IterableContainer> = {
    -readonly [P in keyof T]: T[number];
};

export type { ReorderedArray as R };
