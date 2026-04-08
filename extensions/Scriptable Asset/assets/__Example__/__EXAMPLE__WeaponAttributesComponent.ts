import { Component, Constructor, SpriteFrame, _decorator } from "cc";
import { serialized } from "../serializable";
import { ScriptableAsset } from "../ScriptableAsset";
const { ccclass, property } = _decorator;

enum DamageType
{
    Blunt,
    Pierce,
    Slash
}
enum DictionaryTest
{
    SomeProp= "Hello There",
    DontMix= "AAAAA"
}

class WeaponAttribute
{
    name: string;
    damageType: DamageType;
    test: DictionaryTest;
    damage: number;
    icon: SpriteFrame;
}

@ccclass("__EXAMPLE__WeaponAttributesComponent")
export class __EXAMPLE__WeaponAttributesComponent extends Component
{
    @serialized(WeaponAttribute)
    protected asset: ScriptableAsset<Constructor> = null;

    start()
    {
        const attributes = this.asset.getData();
        console.log(`${attributes.name}: Causes ${attributes.damage} damage of type ${DamageType[attributes.damageType]}. Extra Information: ${attributes.test}`);
    }
}