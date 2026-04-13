
import { pClass } from ".";
import pArray from "./pArray";

namespace pDriver {
    export interface IHandler {
        _function: pFlex.TFunc;
        _priority: number;
    }

    export type TFlex<TEvent extends pFlex.TKey, _TArgs, _TReturn> = [TEvent, pFlex.TFunc<_TArgs, _TReturn>, any, number?, pFlex.TArray<any>?][];

    export interface IDriver<_TKey extends pFlex.TKey, _TArgs, _TReturn> {
        add(event: _TKey, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void
        remove(event: _TKey, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void
        set(event: _TKey, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void 
        clear(event: _TKey): void
        invoke(event: _TKey, ...args: any[]): any[]
    }

    export interface IHOption<TEvent extends pFlex.TKey, TSelf = any> {
        log?: boolean;
        alias?: string;

        key?: (key: any) => TEvent;
        after?: (self: TSelf) => void;
    }

    export class Handler<_TEvent extends pFlex.TKey, _TArgs = any[], _TReturn = any> implements IDriver<_TEvent, _TArgs, _TReturn> {
        public static create<TEvent extends pFlex.TKey, _TArgs, _TReturn>(opt?: IHOption<TEvent, Handler<TEvent>>) {
            const ret = new Handler<TEvent, _TArgs, _TReturn>();
            ret._init(opt);
            return ret;
        }

        constructor() {
            this.log = console.log.bind(console, `${this.__alias_} Log:`);
            this.error = console.error.bind(console, `${this.__alias_} Error:`);
            this.warn = console.warn.bind(console, `${this.__alias_} Warning:`);
        }

        protected _init({ key = (_key: any) => _key as _TEvent, log = false, alias = '[EventDriver]', after = () => {} } : IHOption<_TEvent> = {}): void {
            this.__key_   = key;
            this.__log_   = log;
            this.__alias_ = alias;
            after(this);
        }

        public log: pFlex.TFunc;
        public error: pFlex.TFunc;
        public warn: pFlex.TFunc;

        protected __waiters_: Partial<Record<_TEvent, Promise<void>>> = {}

        protected __log_: boolean = false;
        protected __alias_: string = '[EventDriver]';
        protected __key_: (key: any) => _TEvent = (key: any) => key as _TEvent;
        protected __events_: Partial<Record<_TEvent, pFlex.IBinder[]>> = {};

        async wait(key: _TEvent) {
            const _key = this.__key_(key);
            const _otps = this._get(key);

            const _wait = this.__waiters_[_key];
            if(!_wait) this.__waiters_[_key] = new Promise<void>( _rs => _otps.push(...pClass.mapper([() => _rs && _rs()])) )
            await this.__waiters_[_key];
        }

        protected _actResetWaiter(key: _TEvent) {
            const _key = this.__key_(key);
            const _otps = this._get(key);

            this.__waiters_[_key] = new Promise<void>( _rs => _otps.push(...pClass.mapper([() => _rs && _rs()])) )
        }

        protected _get(key: _TEvent) {
            key = this.__key_(key);

            this.__events_ ??= {};
            this.__events_[key] ??= [];
            return this.__events_[key];
        }

        isEmpty(key: _TEvent) {
            return this._get(key).length <= 0;
        }

        protected _set(key: _TEvent, value: pFlex.IBinder[]) {
            key = this.__key_(key);

            this.__events_ ??= {};
            this.__events_[key] = value;
        }

        set(event: _TEvent, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>, false>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void {
            this._set(event, []);
            this.add(event, listener, ...listeners);
        }

        add(event: _TEvent, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>, false>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void {
            listeners = pArray.flatter(listener, ...listeners);

            const opts = this._get(event);
            opts.push(...pClass.mapper(listeners));
            opts.sort((a, b) => a._priority - b._priority);
        }

        remove(event: _TEvent, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>, false>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void {
            listeners = pArray.flatter(listener, ...listeners);

            const map = pClass.mapper(listeners);
            const opts = this._get(event).filter( opt => {
                const index = map.findIndex( _opt => _opt._function === opt._function && _opt._this === opt._this )
                if(index < 0) return true;

                map.splice(index, 1);
                return false;
            })

            this._set(event, opts);
        }

        clear(event: _TEvent): void {
            this._set(event, []);
        }

        invoke(event: _TEvent, ...args: any[]): any[] {
            try {
                const _key = this.__key_(event);
                const list = this._get(event);
                if(!_key || !list) return;

                const results = list.map(({ _this, _function, _args }) => {
                    _args = _args ?? [];
                    _this ? _function.call(_this, ...args, ..._args) : _function(...args, ..._args)
                });

                this.__waiters_[_key] = Promise.resolve();

                this.__log_ && this.log(`${this.__alias_} Log: Invoked`, this.__key_(event), "with arguments: ", args, "\t\t Listeners: ", list);
                return results;
            } catch (e) {
                this.error(`${this.__alias_} Log: Error`, e);
                return []
            }
        }

        on(events: TFlex<_TEvent, _TArgs, _TReturn>) {
            for(const [ _key, _function, _this, _priority, _args ] of events) this.add(_key, { _function, _this, _priority, _args, _brgs: [] as _TArgs });
        }

        off(events: TFlex<_TEvent, _TArgs, _TReturn>) {
            for(const [ _key, _function, _this ] of events) this.remove(_key, { _function, _this });
        }
    }
}
export default pDriver;
