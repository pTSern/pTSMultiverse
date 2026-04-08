"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.$ = void 0;
exports.update = update;
exports.onChange = onChange;
exports.ready = ready;
exports.close = close;
const fs_1 = __importDefault(require("fs"));
exports.$ = {
    view: "#custom-view",
    ptsa: "#pts-asset"
};
exports.template = `
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
const __list_ = [".pts-bigint", ".pts-number", ".pts-checkbox", ".pts-string"];
async function update(assetList, metaList) {
    this.assetList = assetList;
    this.metaList = metaList;
    //@ts-ignore
    if (!this.metaList)
        return;
    const _out = this.assetList
        .map(_asset => { var _a; return ((_a = _asset === null || _asset === void 0 ? void 0 : _asset.file) === null || _a === void 0 ? void 0 : _a.includes('.pts')) ? fs_1.default.readFileSync(_asset.file, { encoding: 'utf8' }) : null; })
        .filter(Boolean)
        .map(_info => {
        if (!_info)
            return null;
        const _obj = JSON.parse(_info);
        return _toHTML(_obj) + `<ui-code language=json>${_info}</ui-code>`;
    })
        .filter(Boolean);
    this.$.view.innerHTML = `<div>${_out}</div>`;
    __list_.forEach(_key => {
        const _targets = this.$.view.querySelectorAll(_key);
        _targets.forEach((_box) => {
            _box.addEventListener('confirm', (e) => {
                const key = _box.getAttribute('data-key');
                const value = e.target.value; // boolean for checkbox
                console.log(`${_format(_key)} confirm: `, key, value);
            });
        });
    });
}
;
function _format(str) {
    return str
        .split(/(?=[A-Z])|_/)
        .filter(_w => _w.length > 0)
        .map(_w => _w.charAt(0).toUpperCase() + _w.slice(1).toLowerCase())
        .join(' ');
}
function _toHTML(_obj) {
    return Object.keys(_obj).reduce((_total, _key) => {
        const _ret = _obj[_key];
        let _div = "";
        switch (typeof _ret) {
            case 'string':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-input class="pts-string" data-key="${_key}" slot="content" value="${_ret}"></ui-input>
                    </ui-prop>
                    `;
                break;
            case 'number':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-num-input class="pts-number" slot="content" value="${_ret}" data-key="${_key}"></ui-num-input>
                    </ui-prop>
                    `;
                break;
            case 'bigint':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-num-input slot="content" value="${_ret}" data-key="${_key}" class="pts-bigint"></ui-num-input>
                    </ui-prop>
                    `;
                break;
            case 'boolean':
                _div = `
                    <ui-prop>
                        <ui-label slot="label">${_format(_key)}</ui-label>
                        <ui-checkbox class="pts-checkbox" data-key="${_key}" slot="content"</ui-checkbox>
                    </ui-prop>
                    `;
                break;
            case 'symbol':
                _div = `<p>${_key} --- ${_ret.toString()}</p>`;
                break;
            case 'undefined':
                _div = `<p>${_key} --- ${_ret}</p>`;
                break;
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
                    `;
                break;
            case 'function':
                _div = `<ui-markdown>${_key} >> ${_ret.toString()}</ui-markdown>`;
                break;
        }
        return _total + _div + '<br>';
    }, "");
}
function onChange(...ayny) {
    console.log('ui-asset changed-2: ', ...ayny);
}
function ready() {
    const _ae = this.$.ptsa;
    let _is = false;
    _ae.addEventListener('dragover', (e) => {
        if (_is)
            return;
        _is = true;
        for (const _key in e) {
            console.log(`ORIGIN >>> ${_key}: `, (typeof e[_key]).toUpperCase(), " ---- ", e[_key]);
        }
        console.log("\n---------------------");
        for (const _key in e.dataTransfer) {
            console.log(`DATA TRANFER >>> ${_key}: `, (typeof e.dataTransfer[_key]).toUpperCase(), " ---- ", e.dataTransfer[_key]);
        }
        console.log("\n---------------------");
        console.log(e.dataTransfer.getData('value'));
    });
    //@ts-ignore
    this['onChange'] = function onChange(...any) {
        console.log('ui-asset changed: ', ...any);
    };
    __dirname;
}
;
function close() {
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL3B0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUE2REEsd0JBNkJDO0FBaUZELDRCQUdDO0FBRUQsc0JBMEJDO0FBRUQsc0JBQ0M7QUE3TUQsNENBQW1CO0FBb0NOLFFBQUEsQ0FBQyxHQUFHO0lBQ2IsSUFBSSxFQUFFLGNBQWM7SUFDcEIsSUFBSSxFQUFFLFlBQVk7Q0FDckIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Q0FldkIsQ0FBQztBQUlGLE1BQU0sT0FBTyxHQUFHLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUE7QUFDdkUsS0FBSyxVQUFVLE1BQU0sQ0FBa0IsU0FBa0IsRUFBRSxRQUFnQjtJQUM5RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUV6QixZQUFZO0lBQ1osSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTztJQUUxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUztTQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBQyxPQUFBLENBQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSwwQ0FBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsRUFBQSxDQUFDO1NBQ3pHLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDZixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDVCxJQUFHLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sSUFB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QUFDO1FBQzNGLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFFdEMsS0FBSSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNILENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELENBQUMsQ0FBQyxDQUFBO0lBRUYsWUFBWTtJQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEdBQVU7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQTtJQUNELFNBQVMsQ0FBQTtBQUNiLENBQUM7QUFBQSxDQUFDO0FBRUYsU0FBZ0IsS0FBSztBQUNyQixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcydcclxuaW50ZXJmYWNlIEFzc2V0IHtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICBmaWxlOiBzdHJpbmc7XHJcbiAgICBpbXBvcnRlZDogYm9vbGVhbjtcclxuICAgIGltcG9ydGVyOiBzdHJpbmc7XHJcbiAgICBpbnZhbGlkOiBib29sZWFuO1xyXG4gICAgaXNEaXJlY3Rvcnk6IGJvb2xlYW47XHJcbiAgICBsaWJyYXJ5OiB7XHJcbiAgICAgICAgW2V4dG5hbWU6IHN0cmluZ106IHN0cmluZztcclxuICAgIH07XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIHV1aWQ6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBzdWJBc3NldHM6IHtcclxuICAgICAgICBbaWQ6IHN0cmluZ106IEFzc2V0O1xyXG4gICAgfTtcclxufVxyXG5cclxuaW50ZXJmYWNlIE1ldGEge1xyXG4gICAgZmlsZXM6IHN0cmluZ1tdO1xyXG4gICAgaW1wb3J0ZWQ6IGJvb2xlYW47XHJcbiAgICBpbXBvcnRlcjogc3RyaW5nO1xyXG4gICAgc3ViTWV0YXM6IHtcclxuICAgICAgICBbaWQ6IHN0cmluZ106IE1ldGE7XHJcbiAgICB9O1xyXG4gICAgdXNlckRhdGE6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICB9O1xyXG4gICAgdXVpZDogc3RyaW5nO1xyXG4gICAgdmVyOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgU2VsZWN0b3I8JD4gPSB7ICQ6IFJlY29yZDxrZXlvZiAkLCBhbnkgfCBudWxsPiB9ICYgeyBkaXNwYXRjaChzdHI6IHN0cmluZyk6IHZvaWQsIGFzc2V0TGlzdDogQXNzZXRbXSwgbWV0YUxpc3Q6IE1ldGFbXSB9O1xyXG5cclxuZXhwb3J0IGNvbnN0ICQgPSB7XHJcbiAgICB2aWV3OiBcIiNjdXN0b20tdmlld1wiLFxyXG4gICAgcHRzYTogXCIjcHRzLWFzc2V0XCJcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuPGRpdiBjbGFzcz1cInB0cy1jb250YWluZXJcIj5cclxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgZHVtcD1cImNjLkFzc2V0XCI+XHJcbiAgICAgICAgPHVpLWxhYmVsIHNsb3Q9XCJsYWJlbFwiIHZhbHVlPVwiRHVtcGVyXCI+PC91aS1sYWJlbD5cclxuICAgICAgICA8dWktYXNzZXQgaWQ9XCJwdHMtYXNzZXRcIiBzbG90PVwiY29udGVudFwiIGRyb3BwYWJsZT1cInB0c1wiIHZhbHVlPjwvdWktYXNzZXQ+XHJcbiAgICA8L3VpLXByb3A+XHJcbiAgICA8dWktc2VjdGlvbiBjbGFzcz1cImNvbXBvbmVudCBjb25maWdcIiBjYWNoZS1leHBhbmQ9XCJub2RlLWNvbXBvbmVudDpwVFNcIiBleHBhbmQ+XHJcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cImNvbXBvbmVudC1oZWFkZXJcIiBzbG90PVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDx1aS1pY29uIGRlZmF1bHQ9XCJjb21wb25lbnRcIiBjb2xvcj1cInRydWVcIiB2YWx1ZT1cInBUU1wiPjwvdWktaWNvbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+cFRTPC9zcGFuPlxyXG4gICAgICAgIDwvaGVhZGVyPlxyXG4gICAgICAgIDxocj5cclxuICAgICAgICA8ZGl2IGlkPVwiY3VzdG9tLXZpZXdcIj48L2Rpdj5cclxuICAgIDwvdWktc2VjdGlvbj5cclxuPC9kaXY+XHJcbmA7XHJcblxyXG50eXBlIFBhbmVsVGhpcyA9IFNlbGVjdG9yPHR5cGVvZiAkPjtcclxuXHJcbmNvbnN0IF9fbGlzdF8gPSBbXCIucHRzLWJpZ2ludFwiLCBcIi5wdHMtbnVtYmVyXCIsIFwiLnB0cy1jaGVja2JveFwiLCBcIi5wdHMtc3RyaW5nXCJdXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGUodGhpczogUGFuZWxUaGlzLCBhc3NldExpc3Q6IEFzc2V0W10sIG1ldGFMaXN0OiBNZXRhW10pIHtcclxuICAgIHRoaXMuYXNzZXRMaXN0ID0gYXNzZXRMaXN0O1xyXG4gICAgdGhpcy5tZXRhTGlzdCA9IG1ldGFMaXN0O1xyXG5cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgaWYoIXRoaXMubWV0YUxpc3QpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBfb3V0ID0gdGhpcy5hc3NldExpc3RcclxuICAgICAgICAubWFwKF9hc3NldCA9PiBfYXNzZXQ/LmZpbGU/LmluY2x1ZGVzKCcucHRzJykgPyBmcy5yZWFkRmlsZVN5bmMoX2Fzc2V0LmZpbGUsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSA6IG51bGwpXHJcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgICAgIC5tYXAoX2luZm8gPT4ge1xyXG4gICAgICAgICAgICBpZighX2luZm8pIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBfb2JqID0gSlNPTi5wYXJzZShfaW5mbyk7XHJcbiAgICAgICAgICAgIHJldHVybiBfdG9IVE1MKF9vYmopICsgYDx1aS1jb2RlIGxhbmd1YWdlPWpzb24+JHtfaW5mb308L3VpLWNvZGU+YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcclxuXHJcbiAgICB0aGlzLiQudmlldy5pbm5lckhUTUwgPSBgPGRpdj4ke19vdXR9PC9kaXY+YFxyXG5cclxuICAgIF9fbGlzdF8uZm9yRWFjaChfa2V5ID0+IHtcclxuICAgICAgICBjb25zdCBfdGFyZ2V0cyA9IHRoaXMuJC52aWV3LnF1ZXJ5U2VsZWN0b3JBbGwoX2tleSk7XHJcbiAgICAgICAgX3RhcmdldHMuZm9yRWFjaCgoX2JveDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIF9ib3guYWRkRXZlbnRMaXN0ZW5lcignY29uZmlybScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IF9ib3guZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTsgLy8gYm9vbGVhbiBmb3IgY2hlY2tib3hcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke19mb3JtYXQoX2tleSl9IGNvbmZpcm06IGAsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59O1xyXG5cclxuZnVuY3Rpb24gX2Zvcm1hdChzdHI6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0clxyXG4gICAgLnNwbGl0KC8oPz1bQS1aXSl8Xy8pXHJcbiAgICAuZmlsdGVyKF93ID0+IF93Lmxlbmd0aCA+IDApXHJcbiAgICAubWFwKF93ID0+IF93LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgX3cuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcclxuICAgIC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF90b0hUTUwoX29iajogYW55KSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoX29iaikucmVkdWNlKChfdG90YWwsIF9rZXkpID0+IHtcclxuICAgICAgICBjb25zdCBfcmV0ID0gX29ialtfa2V5XTtcclxuICAgICAgICBsZXQgX2RpdiA9IFwiXCJcclxuICAgICAgICBzd2l0Y2godHlwZW9mIF9yZXQpIHtcclxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgIF9kaXYgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHVpLXByb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1sYWJlbCBzbG90PVwibGFiZWxcIj4ke19mb3JtYXQoX2tleSl9PC91aS1sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLWlucHV0IGNsYXNzPVwicHRzLXN0cmluZ1wiIGRhdGEta2V5PVwiJHtfa2V5fVwiIHNsb3Q9XCJjb250ZW50XCIgdmFsdWU9XCIke19yZXR9XCI+PC91aS1pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8L3VpLXByb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIF9kaXYgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHVpLXByb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1sYWJlbCBzbG90PVwibGFiZWxcIj4ke19mb3JtYXQoX2tleSl9PC91aS1sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLW51bS1pbnB1dCBjbGFzcz1cInB0cy1udW1iZXJcIiBzbG90PVwiY29udGVudFwiIHZhbHVlPVwiJHtfcmV0fVwiIGRhdGEta2V5PVwiJHtfa2V5fVwiPjwvdWktbnVtLWlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdiaWdpbnQnOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLWxhYmVsIHNsb3Q9XCJsYWJlbFwiPiR7X2Zvcm1hdChfa2V5KX08L3VpLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktbnVtLWlucHV0IHNsb3Q9XCJjb250ZW50XCIgdmFsdWU9XCIke19yZXR9XCIgZGF0YS1rZXk9XCIke19rZXl9XCIgY2xhc3M9XCJwdHMtYmlnaW50XCI+PC91aS1udW0taW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91aS1wcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLWxhYmVsIHNsb3Q9XCJsYWJlbFwiPiR7X2Zvcm1hdChfa2V5KX08L3VpLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktY2hlY2tib3ggY2xhc3M9XCJwdHMtY2hlY2tib3hcIiBkYXRhLWtleT1cIiR7X2tleX1cIiBzbG90PVwiY29udGVudFwiPC91aS1jaGVja2JveD5cclxuICAgICAgICAgICAgICAgICAgICA8L3VpLXByb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnc3ltYm9sJzpcclxuICAgICAgICAgICAgICAgIF9kaXYgPSBgPHA+JHtfa2V5fSAtLS0gJHtfcmV0LnRvU3RyaW5nKCl9PC9wPmBcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XHJcbiAgICAgICAgICAgICAgICBfZGl2ID0gYDxwPiR7X2tleX0gLS0tICR7X3JldH08L3A+YFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgIF9kaXYgPSBfcmV0ID09IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICA8dWktcHJvcCB0b29sdGlwPVwiVGhpcyBwcm9wZXJ0eSBpcyBudWxsLiBQbGVhc2UgZWRpdCBpdCBtYW51YWx5XCIgcmVhZG9ubHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWktbGFiZWw+JHtfZm9ybWF0KF9rZXkpfTwvdWktbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWktaWNvbiBkZWZhdWx0PVwib3BlcmF0aW9uXCIgdmFsdWU9XCJ3YXJuXCI+PC91aS1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLWlucHV0IHNsb3Q9XCJjb250ZW50XCIgdHlwZT1cImRhbmdlclwiIG91dGxpbmUgdmFsdWU9XCJOVUxMXCI+PC91aS1pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8L3VpLXByb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHVpLXNlY3Rpb24gZXhwYW5kPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktbGFiZWwgc2xvdD1cImhlYWRlclwiPiR7X2Zvcm1hdChfa2V5KX08L3VpLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtfa2V5fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtfdG9IVE1MKF9yZXQpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3VpLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IGA8dWktbWFya2Rvd24+JHtfa2V5fSA+PiAke19yZXQudG9TdHJpbmcoKX08L3VpLW1hcmtkb3duPmBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RvdGFsICsgX2RpdiArICc8YnI+J1xyXG4gICAgfSAsIFwiXCIpXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2hhbmdlKC4uLmF5bnk6IGFueVtdKSB7XHJcbiAgICBjb25zb2xlLmxvZygndWktYXNzZXQgY2hhbmdlZC0yOiAnLCAuLi5heW55KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkeSh0aGlzOiBQYW5lbFRoaXMpIHtcclxuICAgIGNvbnN0IF9hZSA9IHRoaXMuJC5wdHNhO1xyXG4gICAgbGV0IF9pcyA9IGZhbHNlO1xyXG4gICAgX2FlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmKF9pcylyZXR1cm4gXHJcbiAgICAgICAgICAgIF9pcyA9IHRydWVcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IF9rZXkgaW4gZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgT1JJR0lOID4+PiAke19rZXl9OiBgLCAodHlwZW9mIGVbX2tleV0pLnRvVXBwZXJDYXNlKCksIFwiIC0tLS0gXCIsIGVbX2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxyXG5cclxuICAgICAgICBmb3IoY29uc3QgX2tleSBpbiBlLmRhdGFUcmFuc2Zlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgREFUQSBUUkFORkVSID4+PiAke19rZXl9OiBgLCAodHlwZW9mIGUuZGF0YVRyYW5zZmVyW19rZXldKS50b1VwcGVyQ2FzZSgpLCBcIiAtLS0tIFwiLCBlLmRhdGFUcmFuc2Zlcltfa2V5XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3ZhbHVlJykpXHJcblxyXG4gICAgfSlcclxuXHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIHRoaXNbJ29uQ2hhbmdlJ10gPSBmdW5jdGlvbiBvbkNoYW5nZSguLi5hbnk6IGFueVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VpLWFzc2V0IGNoYW5nZWQ6ICcsIC4uLmFueSk7XHJcbiAgICB9XHJcbiAgICBfX2Rpcm5hbWVcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZSh0aGlzOiBQYW5lbFRoaXMsICkge1xyXG59O1xyXG4iXX0=