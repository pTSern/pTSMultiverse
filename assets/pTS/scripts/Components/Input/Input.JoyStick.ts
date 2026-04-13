import { _decorator, Node, Component } from "cc";
import { Base_Driver } from "../Base/Base.Driver";
import { Types_TTouchType } from "../../types/Types.TTouchType";

const { ccclass, property } = _decorator;

@ccclass("Input_JoyStick")
export class Input_JoyStick extends Component {
    @property({ type: Base_Driver })
    driverTouch: Base_Driver<Types_TTouchType, [TouchEvent], void> = null;

    protected onLoad(): void {
        this.driverTouch.add('onTouchStart', { _function: this._onTouchStart, _this: this });
    }

    protected _onTouchStart(event: TouchEvent): void {
        console.log('Touch Start:', event);

    }
}
