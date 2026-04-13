import { _decorator, EventHandler, NodeEventType } from "cc";
import { Base_Driver } from "../Base/Base.Driver";
import { Types_TTouchType } from "../../types/Types.TTouchType";
import { pArray, pClass } from "../../utils";

const { ccclass, property } = _decorator;

@ccclass("Listener_Touch")
export class Listener_Touch extends Base_Driver<Types_TTouchType, [TouchEvent], void> implements Record<Types_TTouchType, EventHandler[]> {
    @property({ type: [EventHandler] })
    onTouchStart: EventHandler[] = [];

    @property({ type: [EventHandler] })
    onTouchMove: EventHandler[] = [];

    @property({ type: [EventHandler] })
    onTouchCancel: EventHandler[] = [];

    @property({ type: [EventHandler] })
    onTouchEnd: EventHandler[] = [];

    protected onLoad(): void {
        //console.log("Listener_Touch loaded. Setting up event listeners.", Const_TouchType);
        //Const_TouchType.forEach(_type => this[`_${_type}`] = event => this.invoke(_type, event))
        //this.node.on(NodeEventType.TOUCH_START, this._onTouchStart, this);
        //this.node.on(NodeEventType.TOUCH_END, this._onTouchEnd, this);
        //this.node.on(NodeEventType.TOUCH_MOVE, this._onTouchMove, this);
        //this.node.on(NodeEventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    protected _events: Map<Types_TTouchType, pFlex.IBinder[]> = new Map();

    add(event: Types_TTouchType, listener: pFlex.TArray<pFlex.THandler>, ...listeners: pFlex.THandler[]): void {
        listeners = pArray.flatter(listener, ...listeners);
        const _lis = pClass.mapper(listeners);

        this._events.set(event, [...(this._events.get(event) || []), ..._lis]);
    }

    remove(event: Types_TTouchType, listener: pFlex.TArray<pFlex.THandler>, ...listeners: pFlex.THandler[]): void {
        listeners = pArray.flatter(listener, ...listeners);
        const _lis = pClass.mapper(listeners);
        const _handles = this._events.get(event);

        if (_handles) {
            this._events.set(event, _handles.filter(_ => !_lis.includes(_)));
        }
    }

    set(event: Types_TTouchType, listener: pFlex.TArray<pFlex.THandler>, ...listeners: pFlex.THandler[]): void {
        listeners = pArray.flatter(listener, ...listeners);
        const _lis = pClass.mapper(listeners);
        this._events.set(event, _lis);
    }

    clear(event: Types_TTouchType): void {
        this._events.delete(event);
    }

    invoke(event: Types_TTouchType, ...args: any[]): any[] {
        EventHandler.emitEvents(this[event], ...args);

        const _handles = this._events.get(event);
        const _out = pClass.emit(_handles, ...args);

        console.log(`Event: ${event}, Handlers: ${_handles?.length || 0}, Output:`, _out);

        return _out;
    }

}

export interface Listener_Touch extends Record<`_${Types_TTouchType}`, pFlex.TFunc<[TouchEvent], void>> {}
