
import pArray from "./pArray";

const _ = {
    convert(listener: pFlex.THandler): pFlex.IBinder {
        return ( typeof listener === 'function' )
                        ? { _function: listener, _priority: 0, _this: null, _args: [] }
                        : { _function: listener._function, _this: listener._this, _priority: listener._priority ?? 0, _args: listener._args }
    },

    mapper<_TArgs, _TReturn>(listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, out?: pFlex.IBinder<_TArgs, _TReturn>[]): pFlex.IBinder<_TArgs, _TReturn>[] {
        if(!listener) return [];
        listener = pArray.flatter(listener);

        out = listener.filter(Boolean)
                       .map( ret => ( typeof ret === 'function' )
                            ? { _function: ret, _priority: 0, _this: null, _args: [] as _TArgs, _brgs: [] as _TArgs }
                            : { _function: ret._function, _this: ret._this, _priority: ret._priority ?? 0, _args: ret._args, _brgs: [] as _TArgs }

        );

        return out;
    },

    emit<_TArg = any>(funcs: pFlex.TArray<pFlex.IBinder<_TArg>>, ...args: _TArg[]) {
        if(!funcs) return;

        funcs = pArray.flatter(funcs);
        const results = funcs.map(({ _this, _function, _args }) => {
            const args_ = _args as _TArg[] ?? [];
            return _this ? _function.call(_this, ...args, ...args_) : _function(...args, ...args_);
        });

        return results;
    }
}

export default _;
