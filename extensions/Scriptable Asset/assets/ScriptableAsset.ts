import { CCObject, Component, JsonAsset, _decorator } from "cc";
import "reflect-metadata";
const { ccclass, property, type } = _decorator;

@ccclass("ScriptableAsset")
export class ScriptableAsset<T extends object> extends Component
{
    @property(JsonAsset)
    protected asset: JsonAsset;
    protected _data: T;

    /** This property is automatically set by using `@serialized` on a property which is `ScriptableAsset`*/
    protected targetPropertyName: string;
    /** This property is automatically set by using `@serialized` on a property which is `ScriptableAsset`*/
    protected owner: any;

    /**
     * Gets the data. This function requires that `asset` is set to its json value.
     * It also requires that the `ScriptableAsset` property contains `@serialized(YOUR_TYPE)`
     * @returns 
     */
    public getData() : T
    {
        if(!this.asset){
            console.warn("No asset.");
            return null;
        }
        if(!this._data)
        {
            const Type = Reflect.getMetadata(this.targetPropertyName, this.owner) as {new(): T};
            if(Type == null)
                throw new Error(`Use @serialized(TARGET_TYPE) for being able to actually get data from ScriptableAsset.`);
            this._data = new Type();
            this.deserialize(this._data, Type);
        }
        return this._data;
    }

    protected deserialize(target : T, Type: {new(): T})
    {
        const json = this.asset.json;
        for(const property of json.properties)
        {
            if(!(property.name in target))
                console.error(`Property ${property.name} does not exist in type ${Type.toString()} to deserialize.`);
            else
                target[property.name] = property.value;
        }
    }
}

