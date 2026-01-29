import { _decorator, JsonAsset } from "cc";
const { ccclass } = _decorator;

@ccclass("pTSAsset")
export class pTSAsset extends JsonAsset {
    get data() { return this.json }
}
