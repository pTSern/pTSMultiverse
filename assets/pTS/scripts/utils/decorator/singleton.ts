import { Component, director, js } from 'cc';
import { SINGLETON_KEY, SINGLETON_GETTER, SINGLETON_OPTION, POOL } from './constants';
import type { ISingletonOptions } from './interfaces';
import type { TWakeEvent } from './types';
import { _resolver } from './wait';
import { instance } from './instance';

const _dSOpt: ISingletonOptions = {
    initer: '_init',
    destroyer: '_clean',
    wake: 'Instantly',
    pooler: false,
    async: false,
    name: undefined
}

const _dSCOpta: ISingletonOptions = {
    initer: 'onLoad',
    destroyer: 'onDestroy',
    wake: 'Instantly',
    pooler: false,
    async: false,
    name: undefined
}

function _waker<TInstance, TAbstract extends boolean = false>(_constructor: pFlex.TCtor<any, TInstance, TAbstract>, wake: TWakeEvent = "None") {
    switch(wake) {
        case "None": break;
        case "Instantly": {
            instance(_constructor);
            break;
        }
        //default: {
        //    const _event = async () => {
        //        instance(_constructor);
        //        pEventManager.remove(wake as NSEventDefine.TEvent, _event)
        //    }
        //    pEventManager.add(wake as NSEventDefine.TEvent, _event)
        //    break;
        //}
    }
}

export function singleton<TClass extends pFlex.TCtor>(_opt?: ISingletonOptions<pFlex.TKeyOf<TClass, Function>>): (_constructor: pFlex.TCtor) => void
export function singleton<TClass>(_opt?: ISingletonOptions<pFlex.TKeyOf<TClass, Function>>): (_constructor: pFlex.TCtor) => void
export function singleton(_opt?: ISingletonOptions) {
    return function (_constructor: pFlex.TCtor) {
        const { prototype } = _constructor;
        const _isComp = prototype instanceof Component;

        _opt = !_opt ? ( _isComp ? _dSCOpta : _dSOpt ) : _opt;

        _constructor[SINGLETON_OPTION] = _opt;

        if(_isComp) {
            const _initer = prototype[_opt.initer];

            prototype[_opt.initer] = !_opt.async ? function(...args: any) {
                _initer && _initer.apply(this, ...args);
                _constructor[SINGLETON_KEY] = this;
                _resolver(_constructor);
            } : async function(...args: any) {
                _initer && await _initer.apply(this, ...args);
                _constructor[SINGLETON_KEY] = this;
                _resolver(_constructor);
            }

            _constructor[SINGLETON_GETTER] = function() {
                if(!_constructor[SINGLETON_KEY]) {
                    _constructor[SINGLETON_KEY] = director.getScene().getComponentInChildren(_constructor);
                    _resolver(_constructor);
                }
                return _constructor[SINGLETON_KEY];
            }

        } else {
            _constructor[SINGLETON_KEY] = null;

            _constructor[SINGLETON_GETTER] = !_opt.async ? function(...args: any[]) {
                if(!_constructor[SINGLETON_KEY]) {
                    _constructor[SINGLETON_KEY] = new _constructor(...args);
                    _constructor[SINGLETON_KEY][_opt.initer] && _constructor[SINGLETON_KEY][_opt.initer](...args);
                    _resolver(_constructor);
                }
                return _constructor[SINGLETON_KEY];
            } : async function(...args: any[]) {
                if(!_constructor[SINGLETON_KEY]) {
                    _constructor[SINGLETON_KEY] = new _constructor(...args);
                    _constructor[SINGLETON_KEY][_opt.initer] && await _constructor[SINGLETON_KEY][_opt.initer](...args);
                    _resolver(_constructor);
                }
                return _constructor[SINGLETON_KEY];
            }

            _waker(_constructor, _opt.wake);
        }

        const _destroyer = prototype[_opt.destroyer];
        prototype[_opt.destroyer] = !_opt.async ? function(...args: any) {
            _destroyer && _destroyer.apply(this, ...args);
            _constructor[SINGLETON_KEY] = null;
        } : async function(...args: any) {
            _destroyer && await _destroyer.apply(this, ...args);
            _constructor[SINGLETON_KEY] = null;
        }

        _opt.pooler && ( POOL[_opt.name ? _opt.name : js.getClassName(_constructor)] = _constructor[SINGLETON_GETTER] );
    }
}
