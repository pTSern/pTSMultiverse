
declare namespace pFlex {
    export type TFunc<_TArgs = any[], _TReturn = any> = _TArgs extends any[] 
      ? (...args: _TArgs) => _TReturn 
      : (...args: _TArgs[]) => _TReturn;

    export type TCtor<_TArgs = any, _TInstance = any, _TAbstract extends boolean = false> = _TAbstract extends false ? new (...args: _TArgs[]) => _TInstance : abstract new (...args: _TArgs[]) => _TInstance;
    export interface IBinder<_TArgs = any, _TReturn = any> {
        _function: TFunc<_TArgs, _TReturn>;
        _priority?: number;
        _this: any;
        _args?: _TArgs;
        _brgs?: _TArgs;
    }

    export type THandler<_TArgs = any[], _TReturn = any> = TFunc<_TArgs, _TReturn> | IBinder<_TArgs, _TReturn>;

    export type TKey = string | symbol | number;
    export type TArrays<TType> = (readonly TType[] | TType[])

    export type TPrototype<_TType> = { prototype: _TType };
    export type TRecorder<_TKey extends TKey, _TValue = any> = Partial<Record<_TKey, _TValue>>

    export type TArrayExtracter<_TKeys extends TKey[], _TValue = any> = { [K in _TKeys[number]]: _TValue }
    export type TExtracter<_TObject extends readonly Object[], _TKeyof extends keyof _TObject[number], _TValue> = {
        [ _VKey in _TObject[number] as _VKey[_TKeyof] & string ]: _TValue
    }

    export type TStaticKeys<_TTarget> = {
        [_VK in keyof _TTarget] : _TTarget[_VK] extends Function ? _VK : never
    }[keyof _TTarget];

    export type TKeyOf<_TTarget, _TCondition = any, _TExclude extends boolean = false> = {
        [_VK in keyof _TTarget]: 
            _TExclude extends true 
                ? (_TTarget[_VK] extends _TCondition ? never : _VK) 
                : (_TTarget[_VK] extends _TCondition ? _VK : never);
    }[keyof _TTarget];

    export type TStringRecord<_TKey extends TKey[], _TPartial extends boolean = false, _TReturn = string> = _TPartial extends true ? Partial<Record<_TKey[number], string>> : Record<_TKey[number], _TReturn>;

    export type TArray<_TTarget, _TIsReadonly extends boolean = false> = _TTarget | ( _TIsReadonly extends true ? readonly _TTarget[] : _TTarget[] );

    export type TOption<_TData, _TKey extends TKeyOf<_TData>> = {
        key: _TKey
        data: _TData[_TKey]
    }

    export type TArg<_TName extends string, _TType> = _TType | { [_VK in _TName]: _TType };

    export namespace Type {
        export type TByTo = 'by' | 'to'
        export type TOnOff = 'on' | 'off'
    }
}
