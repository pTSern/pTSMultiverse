import { LOGS } from './constants';
import type { TWakeEvent } from './types';

export interface ISingletonOptions<TString extends pFlex.TKey = string> extends IDestroyer {
    initer: TString;
    wake?: TWakeEvent;
    pooler?: boolean;
    name?: string;
}

export interface IDestroyer<TString extends pFlex.TKey = string> {
    destroyer: TString;
    async?: boolean;
}

export type ILogger = Record<typeof LOGS[number], pFlex.TFunc<any, void>>;


