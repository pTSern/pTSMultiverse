import { POOL, SINGLETON_GETTER } from './constants';

export function instance<T, TAbstract extends boolean = false>(_constructor: pFlex.TCtor<any, T, TAbstract>, ...args: any[]): T
export function instance<T>(_name: string, ...args: any[]): T
export function instance<T, TAbstract extends boolean = false>(_constructor: pFlex.TCtor<any, T, TAbstract> | string, ...args: any[]): T {
    if (typeof _constructor === 'string') {
        return POOL[_constructor]?.(...args) ?? null;
    }

    return _constructor[SINGLETON_GETTER]?.(...args) ?? null;
}
