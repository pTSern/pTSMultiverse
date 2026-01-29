import { JsonAsset } from "cc";


class _ {
    protected _pool: Map<string, JsonAsset> = new Map();
    watch<_T extends JsonAsset>(asset: _T): _T {
        const json = asset.json;
        if(!json) return null;

        this._pool.set(asset.name, asset);
        return asset;

    }

}

const _ret = new _();
export default _ret;
