import { _decorator, Component } from "cc";
import { pDriver } from "../../utils";

const { ccclass } = _decorator;

@ccclass("Base_Driver")
export abstract class Base_Driver<_TKey extends pFlex.TKey, _TArgs, _TReturn> extends Component implements pDriver.IDriver<_TKey, _TArgs, _TReturn> {
    abstract add(event: _TKey, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void
    abstract remove(event: _TKey, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void
    abstract set(event: _TKey, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void 
    abstract clear(event: _TKey): void
    abstract invoke(event: _TKey, ...args: any[]): any[]
}
