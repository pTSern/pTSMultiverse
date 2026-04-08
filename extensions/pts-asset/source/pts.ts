import fs from 'fs'
interface Asset {
    displayName: string;
    file: string;
    imported: boolean;
    importer: string;
    invalid: boolean;
    isDirectory: boolean;
    library: {
        [extname: string]: string;
    };
    name: string;
    url: string;
    uuid: string;
    visible: boolean;
    subAssets: {
        [id: string]: Asset;
    };
}

interface Meta {
    files: string[];
    imported: boolean;
    importer: string;
    subMetas: {
        [id: string]: Meta;
    };
    userData: {
        [key: string]: any;
    };
    uuid: string;
    ver: string;
}

type Selector<$> = { $: Record<keyof $, any | null> } & { dispatch(str: string): void, assetList: Asset[], metaList: Meta[] };

export const $ = {
    view: "#custom-view",
    ptsa: "#pts-asset"
};

export const template = `
<div class="pts-container">
    <ui-prop type="dump" dump="cc.Asset">
        <ui-label slot="label" value="Dumper"></ui-label>
        <ui-asset id="pts-asset" slot="content" droppable="pts" value></ui-asset>
    </ui-prop>
    <ui-section class="component config" cache-expand="node-component:pTS" expand>
        <header class="component-header" slot="header">
            <ui-icon default="component" color="true" value="pTS"></ui-icon>
            <span class="name">pTS</span>
        </header>
        <hr>
        <div id="custom-view"></div>
    </ui-section>
</div>
`;

type PanelThis = Selector<typeof $>;

const __list_ = [".pts-bigint", ".pts-number", ".pts-checkbox", ".pts-string"]
export async function update(this: PanelThis, assetList: Asset[], metaList: Meta[]) {
    this.assetList = assetList;
    this.metaList = metaList;

    //@ts-ignore
    if(!this.metaList) return;

    const _out = this.assetList
        .map(_asset => _asset?.file?.includes('.pts') ? fs.readFileSync(_asset.file, { encoding: 'utf8' }) : null)
        .filter(Boolean)
        .map(_info => {
            if(!_info) return null;
            const _obj = JSON.parse(_info);
            return _toHTML(_obj) + `<ui-code language=json>${_info}</ui-code>`;
        })
        .filter(Boolean)

    this.$.view.innerHTML = `<div>${_out}</div>`

    __list_.forEach(_key => {
        const _targets = this.$.view.querySelectorAll(_key);
        _targets.forEach((_box: any) => {
            _box.addEventListener('confirm', (e: any) => {
                const key = _box.getAttribute('data-key');
                const value = e.target.value; // boolean for checkbox
                console.log(`${_format(_key)} confirm: `, key, value);
            })
        })
    })
};

function _format(str: string) {
    return str
    .split(/(?=[A-Z])|_/)
    .filter(_w => _w.length > 0)
    .map(_w => _w.charAt(0).toUpperCase() + _w.slice(1).toLowerCase())
    .join(' ');
}

function _toHTML(_obj: any) {
    return Object.keys(_obj).reduce((_total, _key) => {
        const _ret = _obj[_key];
        let _div = ""
        switch(typeof _ret) {
            case 'string':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-input class="pts-string" data-key="${_key}" slot="content" value="${_ret}"></ui-input>
                    </ui-prop>
                    `
                break
            case 'number':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-num-input class="pts-number" slot="content" value="${_ret}" data-key="${_key}"></ui-num-input>
                    </ui-prop>
                    `
                break
            case 'bigint':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-num-input slot="content" value="${_ret}" data-key="${_key}" class="pts-bigint"></ui-num-input>
                    </ui-prop>
                    `
                break
            case 'boolean':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-checkbox class="pts-checkbox" data-key="${_key}" slot="content"</ui-checkbox>
                    </ui-prop>
                    `
                break
            case 'symbol':
                _div = `<p>${_key} --- ${_ret.toString()}</p>`
                break
            case 'undefined':
                _div = `<p>${_key} --- ${_ret}</p>`
                break
            case 'object':
                _div = _ret == null ?
                    `
                    <ui-prop tooltip="This property is null. Please edit it manualy" readonly>
                        <div slot="label">
                            <ui-label>${_format(_key)}</ui-label>
                            <ui-icon default="operation" value="warn"></ui-icon>
                        </div>
                        <ui-input slot="content" type="danger" outline value="NULL"></ui-input>
                    </ui-prop>
                    `
                    :
                    `
                    <ui-section expand>
                        <ui-label slot="header">${_format(_key)}</ui-label>
                        <div class="${_key}">
                            ${_toHTML(_ret)}
                        </div>
                    </ui-section>
                    `
                break
            case 'function':
                _div = `<ui-markdown>${_key} >> ${_ret.toString()}</ui-markdown>`
                break;
        }
        return _total + _div + '<br>'
    } , "")
}
export function onChange(...ayny: any[]) {
    console.log('ui-asset changed-2: ', ...ayny);

}

export function ready(this: PanelThis) {
    const _ae = this.$.ptsa;
    let _is = false;
    _ae.addEventListener('dragover', (e: any) => {
        if(_is)return 
            _is = true

        for(const _key in e) {
            console.log(`ORIGIN >>> ${_key}: `, (typeof e[_key]).toUpperCase(), " ---- ", e[_key]);
        }
        console.log("\n---------------------")

        for(const _key in e.dataTransfer) {
            console.log(`DATA TRANFER >>> ${_key}: `, (typeof e.dataTransfer[_key]).toUpperCase(), " ---- ", e.dataTransfer[_key]);
        }

        console.log("\n---------------------")
        console.log(e.dataTransfer.getData('value'))

    })

    //@ts-ignore
    this['onChange'] = function onChange(...any: any[]) {
        console.log('ui-asset changed: ', ...any);
    }
    __dirname
};

export function close(this: PanelThis, ) {
};
