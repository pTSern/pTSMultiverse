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

## Development Environment

Node.js

## Install

```bash
# Install dependent modules
npm install
# build
npm run build
```

## Usage

After enabling the extension, click `Panel -> scriptable-asset -> Start Modifying JSON Schema` in the main menu bar to open the default panel of the extension.

After opening the panel, select a JSON Schema file that you wish to modify. After selecting the file, it will automatically generate fields for you to start modifying. When you're done, hit `Save Instance`. Select a path and save your JSON File.

After the JSON file is saved, create a new `Node` on your Scene Tree, and create a script for this node. Imagine the following `WeaponComponent`.

```ts
import { _decorator, Component } from 'cc';
import { serialized } from 'db://scriptable-asset/serializable';
import { ScriptableAsset } from 'db://scriptable-asset/ScriptableAsset';
const { ccclass, property } = _decorator;

class WeaponStatus
{
    public name: string;
    public damage: number;
    public cost: number; 
}

@ccclass("WeaponComponent")
export class WeaponComponent extends Component
{
    @serialized(WeaponStatus)
    @property(ScriptableAsset)
    status: ScriptableAsset<WeaponStatus> = new ScriptableAsset();

    start()
    {
        const data = this.status.getData();
        console.log(`New sword named ${data.name} which causes ${data.damage} and costs ${data.cost}`);
    }
}

```

The `@serialized` is an important attribute which gives the `status` field information on which class it is going to represent. After it is executed, the json content is deserialized on this class information (executing its setters if they exist).