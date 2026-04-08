# scriptable-asset

An extension that allows to modify JSON's which follows the scriptable asset json schema:
```ts
export type DataTargetType =
{
    type: string,
    properties: Array<{
        type: string,
        name: string,
        value?: any
    }>
}
```

## JSON Format Specification

- For predefined types, follow this table:

|Type Wanted| Valid Values|
|-----------|-------------|
|Number|number, Number, CCInteger, CCFloat|
|String|string, String, CCString|
|Node|cc.Node|
|JSON|cc.JsonAsset|
|Sprite Frame|cc.SpriteFrame|
|Bitmap Font|cc.BitmapFont||
|TTF Font|cc.TTFFont||

Any other asset type, simply prefix it with `cc.`.

### Custom Types
1. You need to define a property inside your json file, called `customTypes`.
2. For using them, you need to prefix your type name with `.`

### Auto Incrementing Enum
For that, simply use array syntax. They will be treated as numbers, all starting from 0.
Only strings are allowed in the array.

```json
{
    "customTypes": {
        "DamageType": [
            "Pierce",
            "Blunt",
            "Slash"
        ],
    }
}
```

### Dictionary-like
Use the object syntax for that. Each value will hold the value you assign to their key. Only a single type of value is allowed. i.e: Do not mix strings and numbers.
```json
{
    "customTypes": {
        "DamageType": {
            "Pierce": 0,
            "Blunt": 1,
            "Slash": 2
        },
        "EnemyType": {
            "UltraOrc": "Orc",
            "MechaOrc": "Mecha|Orc",
        }

    }
}
```

### Custom Type Usage Example
```json
{
    "type": "WeaponAttributes",
    "customTypes": {
        "DamageType": [
            "Pierce",
            "Blunt",
            "Slash"
        ],
    },
    "properties": [
        {
            "name": "damageType",
            "type": ".DamageType"
        }
    ]
}
```



## Usage
1. Enable the extension
2. Create a JSON file, and define your type:
```json
{
    "type": "WeaponAttributes",
    "properties": [
        {
            "name": "Name",
            "type": "CCString"
        },
        {
            "name": "Damage",
            "type": "CCInteger"
        },
        {
            "name": "Icon",
            "type": "cc.SpriteFrame"
        }
    ]
}
```
3. Click `Panel -> scriptable-asset -> Start Modifying JSON Schema` in the main menu bar to open the default panel of the extension.
4. Select a JSON Schema file that you wish to modify. After selecting the file, it will automatically generate fields for you to start modifying. When you're done, hit `Save Instance`. Select a path and save your JSON File.

After the JSON file is saved, create a new `Node` on your Scene Tree, and create a script for this node. Imagine the following `WeaponComponent`.

```ts
import { _decorator, Component, SpriteFrame } from 'cc';
import { serialized } from 'db://scriptable-asset/serializable';
import { ScriptableAsset } from 'db://scriptable-asset/ScriptableAsset';
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
    protected asset: ScriptableAsset<WeaponAttribute> = null;

    start()
    {
        const attributes = this.asset.getData();
        console.log(`${attributes.name}: Causes ${attributes.damage} damage of type ${DamageType[attributes.damageType]}. Extra Information: ${attributes.test}`);
    }
}
```

The `@serialized` is an important attribute which gives the `status` field information on which class it is going to represent. 
Whenever you have `@serialized` on your field, it will automatically execute `@property(ScriptableAsset)`, so, it will already appear on the editor.
After it is executed, the json content is deserialized on this class information (executing its setters if they exist).