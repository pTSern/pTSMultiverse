import fs from 'fs';

module.exports.load = async function(uuid: string, opt: any) {
    const source = fs.readFileSync(opt.fspath, 'utf8');

    let _js = {};
    try {
        _js = JSON.parse(source);
    } catch(e) {
        console.error("Failed to parse JSON:", e);
        _js = {}
    }

    const _uuid = await Editor.Message.request('asset-db', 'query-uuid', 'db://assets/pTS/scripts/component/pTSAsset.ts')
    if(!_uuid) {
        console.error("Failed to query UUID for pTSAsset.ts");
        return;
    }

    const asset = {
        "__type__": _uuid,
        "json": _js
    }

    return JSON.stringify(asset);
}
