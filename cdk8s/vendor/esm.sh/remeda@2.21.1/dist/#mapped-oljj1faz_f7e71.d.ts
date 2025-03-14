import { I as IterableContainer } from './IterableContainer-CtfinwiH.d.ts';

type Mapped<T extends IterableContainer, K> = {
    -readonly [P in keyof T]: K;
};

export type { Mapped as M };
