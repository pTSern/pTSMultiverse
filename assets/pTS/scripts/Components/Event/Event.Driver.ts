import { _decorator } from "cc";
import { Base_Driver } from "../Base/Base.Driver";
import { pDriver } from "../../utils";

const { ccclass } = _decorator;

@ccclass("Event_Driver")
export class Event_Driver<_TEvent extends pFlex.TKey, _TArgs, _TReturn> extends Base_Driver<_TEvent, _TArgs, _TReturn> {
    protected _driver: pDriver.Handler<_TEvent, _TArgs, _TReturn> = pDriver.Handler.create<_TEvent, _TArgs, _TReturn>();

    add(event: _TEvent, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>, false>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void {
        this._driver.add(event, listener, ...listeners);
    }
    remove(event: _TEvent, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>, false>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void {
        this._driver.remove(event, listener, ...listeners);
    }
    set(event: _TEvent, listener: pFlex.TArray<pFlex.THandler<_TArgs, _TReturn>, false>, ...listeners: pFlex.THandler<_TArgs, _TReturn>[]): void {
        this._driver.set(event, listener, ...listeners);
    }
    clear(event: _TEvent): void {
        this._driver.clear(event);
    }
    invoke(event: _TEvent, ...args: any[]): any[] {
        return this._driver.invoke(event, ...args);
    }


}
