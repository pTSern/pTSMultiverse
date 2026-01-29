
import { instance } from './instance';
import { SINGLETON_KEY } from './constants';

interface _IResolver {
    _promise: Promise<any>;
    _function: TFunction<[any], void>;
    _is: boolean
}

const _waiter = new Map<Function, _IResolver>()

export function _resolver<T>(_constructor: TConstructor<any, T>) {
    if(_waiter.has(_constructor)) {
        const data = _waiter.get(_constructor);
        data._function && data._function(_constructor[SINGLETON_KEY]);
        data._is = true;
    } else {
        _waiter.set(_constructor, { _promise: null, _function: null, _is: true });
    }
}

export function wait<T>(_constructor: TConstructor<any, T>): Promise<T> {
    const data = _waiter.get(_constructor) || (() => {
        let _function = null;
        const _promise = new Promise<T>(rs => _function = rs);
        const _data = { _promise, _function, _is: false };
        _waiter.set(_constructor, _data);
        return _data;
    })();

    return data._is ? Promise.resolve(instance(_constructor)) : data._promise;
}
