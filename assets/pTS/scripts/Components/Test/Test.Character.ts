import { _decorator, Component, v3 } from "cc";
import { Input_JoyStick } from "../Input/Input.JoyStick";
import { pNumber } from "../../utils";

const { ccclass, property } = _decorator;

@ccclass("Test_Character")
export class Test_Character extends Component {
    @property(Input_JoyStick)
    input: Input_JoyStick = null;

    @property({ min: 1 })
    numSpeed: number = 100;

    protected update(dt: number): void {
        const _dir = this.input.dir;
        const _by = v3(dt * this.numSpeed * _dir.x, dt * this.numSpeed * _dir.y);
        const _pos = pNumber.add("Vec3", this.node.position, _by);
        this.node.setPosition(_pos);
    }
}
