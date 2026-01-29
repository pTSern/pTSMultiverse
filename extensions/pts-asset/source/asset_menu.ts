import { AssetInfo } from "@cocos/creator-types/editor/packages/asset-db/@types/public";

exports.onCreateMenu = function(_ai: AssetInfo) {
    return [
        {
            label: "pTS-Asset",
            async click() {
                if(!_ai) {
                    console.error("Asset information is not defined.");
                    return;
                }

                const _path = `${_ai.file}\\asset_info_${Date.now()}.pts`
                const _info = await Editor.Message.request('asset-db', 'create-asset', _path, JSON.stringify({}), { overwrite: true, rename: true })
                if(!_info) {
                    console.warn("Cannot create asset at", _path);
                    return;
                };

                await Editor.Message.request('asset-db', 'refresh-asset', _path);
                const _meta = await Editor.Message.request('asset-db', 'query-asset-meta', _info.uuid)
                if(!_meta) {
                    console.warn("Cannot find asset meta for", _info);
                    return;
                };

                //@ts-ignore
                console.log("Created asset:", Editor.AssetDB, Editor);
                await new Promise(_rs => setTimeout(_rs, 1000));

                _meta.importer = 'pts';
                Editor.Message.request('asset-db', 'save-asset-meta', _info.uuid, JSON.stringify(_meta));

            }

        }
    ]
}

exports.onAssetMenu = function(ai: AssetInfo) {
    return [
        {
            label: "GET ASSET INFO",
            submenu: [
                {
                    label: "cmd1",
                    enabled: ai.isDirectory,
                    click() {
                        console.log("OK", ai)
                    }
                },
                {
                    label: "cmd2",
                    enabled: !ai.isDirectory,
                    click() {
                        console.log("OK2", ai)
                    }
                }
            ]
        }
    ]

}

exports.onDBMenu = function(ai: AssetInfo) {
    return [
        {
            label: "DB MENU",
            click() {
                console.log("DB MENU CLICKED", ai)
            }
        }
    ]
}

exports.onPanelMenu = function(ai: AssetInfo) {
    return [
        {
            label: "PANEL MENU",
            click() {
                console.log("PANEL MENU CLICKED", ai)
            }
        }
    ]

}
