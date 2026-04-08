import "reflect-metadata"
import { _decorator, Component, Constructor, resources } from 'cc';
import { ScriptableAsset } from "./ScriptableAsset";
const { property } = _decorator;

export function serialized<T>(type: Constructor<T>)
{
    const newKey = Symbol();
    return function(target: any, key: string)
    {
        property({
            type: ScriptableAsset, 
            displayName: `${formatFromCamelCase(key)} [${type.name}]`, 
            tooltip: `Add a ScriptableAsset component to your object and move it to this field. This ScriptableAsset must receive a JSON of type ${type.name}. This will be checked at runtime.`
        })(target, key, null);

        Reflect.defineMetadata(key, type, target);
        return Object.defineProperty(target, key,
            {
                get(){
                    if(this[newKey])
                    {
                        this[newKey].owner = this;
                        this[newKey].targetPropertyName = key;
                    }
                    return this[newKey];
                },
                set (v: any)
                {
                    if(v === null) 
                        this[newKey] = null;
                    else if(v === undefined) 
                        this[newKey] = undefined;
                    else if(v instanceof ScriptableAsset)
                        this[newKey] = v;
                    else if(v.uuid)
                    {
                        const theComponent = (this as Component).node.components.find((comp) => comp.uuid == v.uuid);
                        this[newKey] = theComponent;
                    }
                    else 
                    {
                        console.error(`Assigning invalid value '${v}' to property ${key}`);
                        this[newKey] = v;
                    }
                },
                enumerable: true,
                configurable: true
        });
    }
}

function formatFromCamelCase(input: string) : string
{
    if(input.length == 0) throw new Error(`Can't format input string ${input}`);
    const ret: Array<string> = [input[0].toUpperCase()];
    for(let i = 1; i < input.length - 1; i++)
    {
        ret.push(input[i]);
        if(input[i].toLowerCase() == input[i] && input[i+1] == input[i+1].toUpperCase())
            ret.push(" ");
    }
    ret.push(input[input.length-1]);
    return ret.join("");
}
