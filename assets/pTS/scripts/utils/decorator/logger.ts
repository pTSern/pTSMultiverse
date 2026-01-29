
import { js } from 'cc';
import { LOGS, LOG_LEVEL } from './constants';
import pArray from '../pArray'

export type ILoggerOption<TClass> = 
    | _ILoggerOption
    | _ILoggerGetter<TClass>
    | _ILoggerGet<TClass>;

interface _ILoggerOption {
    name: string;
    level?: number;
    surfixs?: pFlex.TArray<string>
    getter?: never;
    get?: never;
}

interface _ILoggerGetter<TClass> {
    getter: pFlex.TKeyOf<TClass>;
    level?: number;
    name?: never;
    surfixs?: never;
    get?: never;
}

interface _ILoggerGet<TClass> {
    get: pFlex.TKeyOf<TClass, Function>;
    level?: number;
    name?: never;
    surfixs?: never;
    getter?: never; 
}

type _TLoggerOption = "Option" | "Getter" | "Get";

export function logger<IsAbstract extends boolean = false>(name: string | ILoggerOption<any>, ...surfixs: string[]): (_constructor: pFlex.TCtor<any, any, IsAbstract>) => void
export function logger<TClass, TOption extends _TLoggerOption, TAbstract extends boolean = false>(data: TOption extends 'Option' ? _ILoggerOption : TOption extends 'Getter' ? _ILoggerGetter<TClass> : _ILoggerGet<TClass>): (_constructor: pFlex.TCtor<any, any, TAbstract>) => void
export function logger(): (_constructor: pFlex.TCtor) => void
export function logger<TClass>(name?: string | ILoggerOption<TClass>, ...surfixs: string[]) {
    return function (_constructor: pFlex.TCtor) {
        const { prototype } = _constructor;

        const _VOIDF = () => void 0;
        for(const key of LOGS) {
            const _key = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;

            if (!!name) {
                if (typeof name === 'string') {
                    prototype[key] = (LOG_LEVEL <= 0) ? console[key].bind(console, `[${name}] ${_key} >>>`, ...surfixs) : _VOIDF
                } else {
                    const _console = console[key];
                    const level = name.level || 0;
                    const _is = (LOG_LEVEL <= level);

                    if('name' in name) {
                        const _prefix = prototype[name.name];
                        surfixs = pArray.flatter(name.surfixs);
                        prototype[key] = _is ? console[key].bind(console, `[${_prefix}] ${_key} >>>`, ...surfixs) : _VOIDF;
                    } else if ('getter' in name) {
                        const _getter = name.getter;
                        prototype[key] = _is ? function(...args: any[]) {
                            const _name = this[_getter];
                            return _console.call(console, `[${_name}] ${_key} >>>`, ...args);
                        } : _VOIDF;
                    } else if ('get' in name) {
                        const _get = name.get;
                        prototype[key] = _is ? function(...args: any[]) {
                            const _name = this[_get]();
                            return _console.call(console, `[${_name}] ${_key} >>>`, ...args);
                        } : _VOIDF;
                    }
                }
            } else {
                const _class = js.getClassName(prototype);
                prototype[key] = ( LOG_LEVEL <= 0 ) ? console[key].bind(console, `[${_class}] ${_key} >>>`, ...surfixs) : _VOIDF;
            }
        }
    };
}
