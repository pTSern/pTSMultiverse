import fs from 'fs'
import json from '../package.json'
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    showLog() {
        console.log('Hello World');
    },
    onCreateMenuX(ai: any) {
        console.log('onCreateMenu', ai);
    },
    async register(url, ...args: any[]) {
        console.log("SCRIPTABLE >>", url, ...args)
        const _out = await Editor.Message.request('asset-db', 'query-asset-info', url)
        console.log("Output Registered Asset:", _out);
    },

    "selection:changed"(type: string, ids: string[]) {
        if (type === 'asset') {
            console.log('Selected Asset UUIDs:', ids);
            // ids[0] is the UUID of the currently inspected asset
        }
    },
    reload() { _load() },
    async onSelectionSelect(type: string, uuid: string) {
        console.log("onSelectionSelect >>", type, uuid);
        if(type !== 'asset') return;
        const _out = await Editor.Message.request('asset-db', 'query-asset-info', uuid)

        console.log("Output Selected Assets:", _out);
    },
    onOpenPanel(...args: any[]) {
        console.log("onOpenPanel >>", ...args)
        Editor.Panel.open(json.name);

    },

};

async function _load() {
    const _all = await Editor.Message.request('asset-db', 'query-assets', { pattern: "db://assets/**/*" })

    const _prm = _all.map(async _asset => {
        if(_asset.isDirectory) return;

        const _meta = await Editor.Message.request('asset-db', 'query-asset-meta', _asset.uuid);

        if(!_meta) return;
        if(!_meta.files.includes('.pts')) return;
        if(_meta.importer === 'pts')return 

        _meta.importer = 'pts';

        const _info = await Editor.Message.request('asset-db', 'query-asset-info', _asset.uuid);
        if(!_info) return;

        return Editor.Message.request('asset-db', 'save-asset-meta', _info.uuid, JSON.stringify(_meta, null, 2))
    })

    const f = await Promise.all(_prm);

    await Editor.Message.request('asset-db', 'refresh-asset', "db://assets");

    console.log("PTS Importer assigned to all .pts files.", f);
}

/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
export async function load() {
    _load();
    console.log('Extension loaded');
}

/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
export function unload() {
    console.log('Extension unloaded');
}
