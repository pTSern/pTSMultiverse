import { _decorator, Component, Node, EventTouch, Label, UIOpacity, Tween, tween, TweenEasing } from "cc";
import { Base_Driver } from "../Base/Base.Driver";
import { Types_TTouchType } from "../../types/Types.TTouchType";
import { pComponent, pConst, pNode, pEasing } from "../../utils";
import { DEBUG } from "cc/env";

const { ccclass, property } = _decorator;

@ccclass("Input_JoyStick")
export class Input_JoyStick extends Component {
    @property({ type: Base_Driver, group: pConst.group.core })
    driver: Base_Driver<Types_TTouchType, [EventTouch], void> = null;

    @property({ type: Node })
    protected _root: Node = null;
    @property({ type: Node, group: pConst.group.core })
    get root(): Node { if(!this._root) this._root = this.node; return this._root }
    set root(x) { this._root = x || this.node }

    @property({ type: Node, group: pConst.group.core })
    knob: Node = null;

    @property({ min: 0, group: pConst.group.core })
    numRad: number = 150;

    @property({ min: 0, group: pConst.group.core })
    numFadeDur: number = 0.2;

    @property({ type: pEasing , group: pConst.group.core })
    easeFade: TweenEasing = 'smooth';

    @property({ type: Label, group: pConst.group.editor })
    labDebug: Label = null;

    protected _tid: number = -1;
    protected _tween: Tween<UIOpacity> = null;
    protected _opx: UIOpacity = null;

    get dir() { return this.knob.position.clone().normalize() }

    protected onLoad(): void {
        this.driver = this.driver || pNode.search(Base_Driver);
        if(!this.driver) return;

        this._opx = pComponent.getSafeComp(this.root, UIOpacity);
        this._tween = tween(this._opx).to(this.numFadeDur, { opacity: 0 }, { easing: this.easeFade });

        this.driver.add('onTouchStart', { _function: this._onTouchStart, _this: this });
        this.driver.add('onTouchMove', { _function: this._onTouchMove, _this: this });
        this.driver.add('onTouchEnd', { _function: this._onTouchEnd, _this: this });

        this.knob.setPosition(0, 0);
        this._opx.opacity = 0
    }

    protected onDestroy(): void {
        this.driver.remove('onTouchStart', { _function: this._onTouchStart, _this: this });
        this.driver.remove('onTouchMove', { _function: this._onTouchMove, _this: this });
        this.driver.remove('onTouchEnd', { _function: this._onTouchEnd, _this: this });

        this._tween?.stop();
        this._tween = null;
    }

    protected _onTouchStart(event: EventTouch): void {
        if(this._tid !== -1) return;
        this._tid = event.getID();

        this._tween?.stop();
        this._opx.opacity = 255;

        const _v2 = event.getUILocation();
        this.root.setWorldPosition(_v2.x, _v2.y, 0);
        this.knob.setPosition(0, 0, 0);

        this._actUpdateDebug();
    }

    protected _onTouchMove(event: EventTouch): void {
        if(event.getID() !== this._tid) return;

        const _pos = event.getUILocation();
        const _wold = this.root.worldPosition;

        const _dx = _pos.x - _wold.x;
        const _dy = _pos.y - _wold.y;
        const _len = Math.sqrt(_dx * _dx + _dy * _dy);

        const _maxR = Math.max(0, this.numRad);
        const _clampedLen = _maxR > 0 ? Math.min(_len, _maxR) : 0;
        const _scale = _len > 0 ? _clampedLen / _len : 0;

        const kx = _dx * _scale;
        const ky = _dy * _scale;

        this.knob.setPosition(kx, ky, 0);
        this._actUpdateDebug();
    }

    protected _onTouchEnd(event: EventTouch): void {
        if(event.getID() !== this._tid) return;
        this._tid = -1;

        this.knob.setPosition(0, 0);
        this._tween?.start();

        this._actUpdateDebug();
    }

    protected _actUpdateDebug() {
        if(!DEBUG) return;
        if(!this.labDebug) return;

        const _dir = this.dir;
        this.labDebug.string = `${_dir.x.toFixed(2)} - ${_dir.y.toFixed(2)}`;
    }
}
