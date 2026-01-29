//import { __private, Component, director, js, _decorator } from "cc";
//import { EDITOR } from 'cc/env'
//import pArray from "./pArray";
//
//namespace pDecorators {
//    const _logs = ['log', 'warn', 'error'] as const;
//    const _pTSingletonKey = Symbol('__pTS_instance__');
//    const _pTSingletonGetter = Symbol('__pTS_get_instance__');
//    const _pTSOption = Symbol('__pTS_option__');
//
//    const _waiter = new Map<Function, { _promise: Promise<any>, _function: (status: any) => void, _is: boolean }>()
//    const _pool = {};
//
//    type _TWakeEvent = 'Instantly' | "None"
//
//    export type ILogger = Record<typeof _logs[number], pFlex.TFunc<any, void>>;
//    export interface ISingletonOptions<TString extends pFlex.TKey = string> extends IDestroyer {
//        initer: TString;
//        wake?: _TWakeEvent;
//        pooler?: string;
//    }
//
//    interface IDestroyer<TString extends pFlex.TKey = string> {
//        destroyer: TString;
//        async?: boolean;
//    }
//
//    const _dSOpt: ISingletonOptions = {
//        initer: '_init',
//        destroyer: '_clean',
//        wake: 'Instantly',
//        pooler: null,
//        async: false,
//    }
//
//    const _dSCOpta: ISingletonOptions = {
//        initer: 'onLoad',
//        destroyer: 'onDestroy',
//        wake: 'Instantly',
//        pooler: null,
//        async: false,
//    }
//
//    export type ILoggerOption<TClass> = 
//        | _ILoggerOption
//        | _ILoggerGetter<TClass>
//        | _ILoggerGet<TClass>;
//
//    interface _ILoggerOption {
//        name: string;
//        surfixs?: pFlex.TArray<string>
//        getter?: never;
//        get?: never;
//    }
//
//    interface _ILoggerGetter<TClass> {
//        getter: pFlex.TKeyOf<TClass>;
//        name?: never;
//        surfixs?: never;
//        get?: never;
//    }
//
//    interface _ILoggerGet<TClass> {
//        get: pFlex.TKeyOf<TClass, Function>;
//        name?: never;
//        surfixs?: never;
//        getter?: never; 
//    }
//
//    type _TLoggerOption = "Option" | "Getter" | "Get";
//    export function scripable(name: string) {
//        if(EDITOR) {
//            //@ts-ignore
//            const _Editor = Editor;
//            if(!_Editor) return;
//
//            return function (_constructor: pFlex.TConstructor) {
//            }
//        }
//
//        return function (_constructor: pFlex.TConstructor) {
//            globalThis['pTScript'] = globalThis['pTScript'] || {};
//            globalThis['pTScript'][name] = _constructor;
//            console.log("Register Scripable: ", name, _constructor);
//        }
//    }
//
//    export function logger<IsAbstract extends boolean = false>(name: string, ...surfixs: string[]): (_constructor: pFlex.TConstructor<any, any, IsAbstract>) => void
//    export function logger<TClass, TOption extends _TLoggerOption, TAbstract extends boolean = false>(data: TOption extends 'Option' ? _TLoggerOption : TOption extends 'Getter' ? _ILoggerGetter<TClass> : _ILoggerGet<TClass>): (_constructor: pFlex.TConstructor<any, any, TAbstract>) => void
//    export function logger(): (_constructor: pFlex.TConstructor) => void
//    export function logger<TClass>(name?: string | ILoggerOption<TClass>, ...surfixs: string[]) {
//        return function (_constructor: pFlex.TConstructor) {
//            const { prototype } = _constructor;
//
//            for(const key of _logs) {
//                const _key = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
//
//                if (!!name) {
//                    if (typeof name === 'string') {
//                        prototype[key] = console[key].bind(console, `[${name}] ${_key} >>>`, ...surfixs);
//                    } else if ('name' in name) {
//                        const _prefix = prototype[name.name];
//                        surfixs = pArray.flatter(name.surfixs);
//                        prototype[key] = console[key].bind(console, `[${_prefix}] ${_key} >>>`, ...surfixs);
//                    } else {
//                        const _console = console[key];
//
//                        if ('getter' in name) {
//                            const _getter = name.getter;
//                            prototype[key] = function(...args: any[]) {
//                                const _name = this[_getter];
//                                return _console.call(console, `[${_name}] ${_key} >>>`, ...args);
//                            };
//                        } else if ('get' in name) {
//                            const _get = name.get;
//                            prototype[key] = function(...args: any[]) {
//                                const _name = this[_get]();
//                                return _console.call(console, `[${_name}] ${_key} >>>`, ...args);
//                            };
//                        }
//                    }
//                } else {
//                    const _class = js.getClassName(prototype);
//                    prototype[key] = console[key].bind(console, `[${_class}] ${_key} >>>`, ...surfixs);
//                }
//            }
//        };
//    }
//
//    function _waker<TInstance, TAbstract extends boolean = false>(_constructor: pFlex.TConstructor<any, TInstance, TAbstract>, wake: _TWakeEvent = "None") {
//        switch(wake) {
//            case "None": break;
//            case "Instantly": {
//                instance(_constructor);
//                break;
//            }
//            default: {
//                const _event = async () => {
//                    instance(_constructor);
//                    //pEventManager.remove(wake as NSEventDefine.TEvent, _event)
//                }
//                _event;
//                //pEventManager.add(wake as NSEventDefine.TEvent, _event)
//                break;
//            }
//        }
//    }
//
//    export function sign<TInstance, TAbstract extends boolean = false>(getter: string, isPool: boolean = false, wake: _TWakeEvent = "None") {
//        return function (_constructor: pFlex.TConstructor<any, TInstance, TAbstract>) {
//            _constructor[_pTSingletonGetter] = _constructor[getter];
//            isPool && ( _pool[js.getClassName(_constructor)] = _constructor[getter] );
//            _waker(_constructor, wake);
//        }
//    }
//
//    export function singleton<TClass extends pFlex.TConstructor>(_opt?: ISingletonOptions<pFlex.TKeyOf<TClass, Function>>): (_constructor: pFlex.TConstructor) => void
//    export function singleton<TClass>(_opt?: ISingletonOptions<pFlex.TKeyOf<TClass, Function>>): (_constructor: pFlex.TConstructor) => void
//    export function singleton(_opt?: ISingletonOptions) {
//        return function (_constructor: pFlex.TConstructor) {
//            const { prototype } = _constructor;
//            const _isComp = prototype instanceof Component;
//
//            _opt = !_opt ? ( _isComp ? _dSCOpta : _dSOpt ) : _opt;
//
//            _constructor[_pTSOption] = _opt;
//
//            if(_isComp) {
//                const _initer = prototype[_opt.initer];
//
//                prototype[_opt.initer] = !_opt.async ? function(...args: any) {
//                    _initer && _initer.apply(this, ...args);
//                    _constructor[_pTSingletonKey] = this;
//                    _resolver(_constructor);
//                } : async function(...args: any) {
//                    _initer && await _initer.apply(this, ...args);
//                    _constructor[_pTSingletonKey] = this;
//                    _resolver(_constructor);
//                }
//
//                _constructor[_pTSingletonGetter] = function() {
//                    if(!_constructor[_pTSingletonKey]) {
//                        _constructor[_pTSingletonKey] = director.getScene().getComponentInChildren(_constructor);
//                        _resolver(_constructor);
//                    }
//                    return _constructor[_pTSingletonKey];
//                }
//
//            } else {
//                _constructor[_pTSingletonKey] = null;
//
//                _constructor[_pTSingletonGetter] = !_opt.async ? function(...args: any[]) {
//                    if(!_constructor[_pTSingletonKey]) {
//                        _constructor[_pTSingletonKey] = new _constructor(...args);
//                        _constructor[_pTSingletonKey][_opt.initer] && _constructor[_pTSingletonKey][_opt.initer](...args);
//                        _resolver(_constructor);
//                    }
//                    return _constructor[_pTSingletonKey];
//                } : async function(...args: any[]) {
//                    if(!_constructor[_pTSingletonKey]) {
//                        _constructor[_pTSingletonKey] = new _constructor(...args);
//                        _constructor[_pTSingletonKey][_opt.initer] && await _constructor[_pTSingletonKey][_opt.initer](...args);
//                        _resolver(_constructor);
//                    }
//                    return _constructor[_pTSingletonKey];
//                }
//
//                _waker(_constructor, _opt.wake);
//            }
//
//            const _destroyer = prototype[_opt.destroyer];
//            prototype[_opt.destroyer] = !_opt.async ? function(...args: any) {
//                _destroyer && _destroyer.apply(this, ...args);
//                _constructor[_pTSingletonKey] = null;
//            } : async function(...args: any) {
//                _destroyer && await _destroyer.apply(this, ...args);
//                _constructor[_pTSingletonKey] = null;
//            }
//
//            !!_opt.pooler && ( _pool[_opt.pooler] = _constructor[_pTSingletonGetter] );
//        }
//    }
//
//    export function instance<T, TAbstract extends boolean = false>(_constructor: pFlex.TConstructor<any, T, TAbstract>, ...args: any[]): T
//    export function instance<T>(_name: string, ...args: any[]): T
//    export function instance<T, TAbstract extends boolean = false>(_constructor: pFlex.TConstructor<any, T, TAbstract> | string, ...args: any[]): T {
//        return (typeof _constructor === 'string') ?
//            _pool[_constructor] ? _pool[_constructor](...args) as T : null
//            : !!_constructor[_pTSingletonGetter] ? _constructor[_pTSingletonGetter](...args) : null;
//    }
//
//    export function destroy<T>(_constructor: pFlex.TConstructor<any, T> | string, ...args: any[]) {
//        const _opt: ISingletonOptions = _constructor[_pTSOption];
//        if(!_opt) return;
//        const { destroyer } = _opt
//
//        const _target = (typeof _constructor === 'string') ?
//            _pool[_constructor] ? _pool[_constructor](...args) as T : null
//            : !!_constructor[_pTSingletonGetter] ? _constructor[_pTSingletonGetter](...args) : null;
//
//        _target[destroyer] && _target[destroyer](...args);
//        ( typeof _constructor === 'string' ) && ( _pool[_constructor] = null );
//    }
//
//    function _resolver<T>(_constructor: pFlex.TConstructor<any, T>) {
//        if(_waiter.has(_constructor)) {
//            const data = _waiter.get(_constructor);
//            data._function && data._function(_constructor[_pTSingletonKey]);
//            data._is = true;
//        } else {
//            _waiter.set(_constructor, { _promise: null, _function: null, _is: true });
//        }
//    }
//
//    export function wait<T>(_constructor: pFlex.TConstructor<any, T>): Promise<T> {
//        const data = _waiter.get(_constructor) || (() => {
//            let _function = null;
//            const _promise = new Promise<T>(rs => _function = rs);
//            const _data = { _promise, _function, _is: false };
//            _waiter.set(_constructor, _data);
//            return _data;
//        })();
//
//        return data._is ? Promise.resolve(instance(_constructor)) : data._promise;
//    }
//}
//
//export default pDecorators;
