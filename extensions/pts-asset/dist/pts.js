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
    view: "#custom-view"
};
exports.template = `
<div class="pts-container">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL3B0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUF3REEsd0JBNkJDO0FBaUZELDRCQUdDO0FBRUQsc0JBT0M7QUFFRCxzQkFDQztBQXJMRCw0Q0FBbUI7QUFvQ04sUUFBQSxDQUFDLEdBQUc7SUFDYixJQUFJLEVBQUUsY0FBYztDQUN2QixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7O0NBV3ZCLENBQUM7QUFJRixNQUFNLE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQ3ZFLEtBQUssVUFBVSxNQUFNLENBQWtCLFNBQWtCLEVBQUUsUUFBZ0I7SUFDOUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFFekIsWUFBWTtJQUNaLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUFFLE9BQU87SUFFMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVM7U0FDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQUMsT0FBQSxDQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksMENBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLEVBQUEsQ0FBQztTQUN6RyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1QsSUFBRyxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFD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LEtBQUssUUFBUTtnQkFDVCxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO29CQUNqQjs7O3dDQUdvQixPQUFPLENBQUMsSUFBSSxDQUFDOzs7OztxQkFLaEM7b0JBQ0QsQ0FBQzt3QkFDRDs7a0RBRThCLE9BQU8sQ0FBQyxJQUFJLENBQUM7c0NBQ3pCLElBQUk7OEJBQ1osT0FBTyxDQUFDLElBQUksQ0FBQzs7O3FCQUd0QixDQUFBO2dCQUNMLE1BQUs7WUFDVCxLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxHQUFHLGdCQUFnQixJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQTtnQkFDakUsTUFBTTtRQUNkLENBQUM7UUFDRCxPQUFPLE1BQU0sR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFBO0lBQ2pDLENBQUMsRUFBRyxFQUFFLENBQUMsQ0FBQTtBQUNYLENBQUM7QUFDRCxTQUFnQixRQUFRLENBQUMsR0FBRyxJQUFXO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVqRCxDQUFDO0FBRUQsU0FBZ0IsS0FBSztJQUVqQixZQUFZO0lBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsUUFBUSxDQUFDLEdBQUcsR0FBVTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFBO0lBQ0QsU0FBUyxDQUFBO0FBQ2IsQ0FBQztBQUFBLENBQUM7QUFFRixTQUFnQixLQUFLO0FBQ3JCLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbnRlcmZhY2UgQXNzZXQge1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcclxuICAgIGZpbGU6IHN0cmluZztcclxuICAgIGltcG9ydGVkOiBib29sZWFuO1xyXG4gICAgaW1wb3J0ZXI6IHN0cmluZztcclxuICAgIGludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBpc0RpcmVjdG9yeTogYm9vbGVhbjtcclxuICAgIGxpYnJhcnk6IHtcclxuICAgICAgICBbZXh0bmFtZTogc3RyaW5nXTogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgdXVpZDogc3RyaW5nO1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHN1YkFzc2V0czoge1xyXG4gICAgICAgIFtpZDogc3RyaW5nXTogQXNzZXQ7XHJcbiAgICB9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTWV0YSB7XHJcbiAgICBmaWxlczogc3RyaW5nW107XHJcbiAgICBpbXBvcnRlZDogYm9vbGVhbjtcclxuICAgIGltcG9ydGVyOiBzdHJpbmc7XHJcbiAgICBzdWJNZXRhczoge1xyXG4gICAgICAgIFtpZDogc3RyaW5nXTogTWV0YTtcclxuICAgIH07XHJcbiAgICB1c2VyRGF0YToge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuICAgIH07XHJcbiAgICB1dWlkOiBzdHJpbmc7XHJcbiAgICB2ZXI6IHN0cmluZztcclxufVxyXG5cclxudHlwZSBTZWxlY3RvcjwkPiA9IHsgJDogUmVjb3JkPGtleW9mICQsIGFueSB8IG51bGw+IH0gJiB7IGRpc3BhdGNoKHN0cjogc3RyaW5nKTogdm9pZCwgYXNzZXRMaXN0OiBBc3NldFtdLCBtZXRhTGlzdDogTWV0YVtdIH07XHJcblxyXG5leHBvcnQgY29uc3QgJCA9IHtcclxuICAgIHZpZXc6IFwiI2N1c3RvbS12aWV3XCJcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuPGRpdiBjbGFzcz1cInB0cy1jb250YWluZXJcIj5cclxuICAgIDx1aS1zZWN0aW9uIGNsYXNzPVwiY29tcG9uZW50IGNvbmZpZ1wiIGNhY2hlLWV4cGFuZD1cIm5vZGUtY29tcG9uZW50OnBUU1wiIGV4cGFuZD5cclxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwiY29tcG9uZW50LWhlYWRlclwiIHNsb3Q9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgPHVpLWljb24gZGVmYXVsdD1cImNvbXBvbmVudFwiIGNvbG9yPVwidHJ1ZVwiIHZhbHVlPVwicFRTXCI+PC91aS1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj5wVFM8L3NwYW4+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgPGhyPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJjdXN0b20tdmlld1wiPjwvZGl2PlxyXG4gICAgPC91aS1zZWN0aW9uPlxyXG48L2Rpdj5cclxuYDtcclxuXHJcbnR5cGUgUGFuZWxUaGlzID0gU2VsZWN0b3I8dHlwZW9mICQ+O1xyXG5cclxuY29uc3QgX19saXN0XyA9IFtcIi5wdHMtYmlnaW50XCIsIFwiLnB0cy1udW1iZXJcIiwgXCIucHRzLWNoZWNrYm94XCIsIFwiLnB0cy1zdHJpbmdcIl1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBQYW5lbFRoaXMsIGFzc2V0TGlzdDogQXNzZXRbXSwgbWV0YUxpc3Q6IE1ldGFbXSkge1xyXG4gICAgdGhpcy5hc3NldExpc3QgPSBhc3NldExpc3Q7XHJcbiAgICB0aGlzLm1ldGFMaXN0ID0gbWV0YUxpc3Q7XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBpZighdGhpcy5tZXRhTGlzdCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IF9vdXQgPSB0aGlzLmFzc2V0TGlzdFxyXG4gICAgICAgIC5tYXAoX2Fzc2V0ID0+IF9hc3NldD8uZmlsZT8uaW5jbHVkZXMoJy5wdHMnKSA/IGZzLnJlYWRGaWxlU3luYyhfYXNzZXQuZmlsZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pIDogbnVsbClcclxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAgICAgLm1hcChfaW5mbyA9PiB7XHJcbiAgICAgICAgICAgIGlmKCFfaW5mbykgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IF9vYmogPSBKU09OLnBhcnNlKF9pbmZvKTtcclxuICAgICAgICAgICAgcmV0dXJuIF90b0hUTUwoX29iaikgKyBgPHVpLWNvZGUgbGFuZ3VhZ2U9anNvbj4ke19pbmZvfTwvdWktY29kZT5gO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxyXG5cclxuICAgIHRoaXMuJC52aWV3LmlubmVySFRNTCA9IGA8ZGl2PiR7X291dH08L2Rpdj5gXHJcblxyXG4gICAgX19saXN0Xy5mb3JFYWNoKF9rZXkgPT4ge1xyXG4gICAgICAgIGNvbnN0IF90YXJnZXRzID0gdGhpcy4kLnZpZXcucXVlcnlTZWxlY3RvckFsbChfa2V5KTtcclxuICAgICAgICBfdGFyZ2V0cy5mb3JFYWNoKChfYm94OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgX2JveC5hZGRFdmVudExpc3RlbmVyKCdjb25maXJtJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gX2JveC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlOyAvLyBib29sZWFuIGZvciBjaGVja2JveFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7X2Zvcm1hdChfa2V5KX0gY29uZmlybTogYCwga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn07XHJcblxyXG5mdW5jdGlvbiBfZm9ybWF0KHN0cjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAuc3BsaXQoLyg/PVtBLVpdKXxfLylcclxuICAgIC5maWx0ZXIoX3cgPT4gX3cubGVuZ3RoID4gMClcclxuICAgIC5tYXAoX3cgPT4gX3cuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBfdy5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgLmpvaW4oJyAnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX3RvSFRNTChfb2JqOiBhbnkpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhfb2JqKS5yZWR1Y2UoKF90b3RhbCwgX2tleSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IF9yZXQgPSBfb2JqW19rZXldO1xyXG4gICAgICAgIGxldCBfZGl2ID0gXCJcIlxyXG4gICAgICAgIHN3aXRjaCh0eXBlb2YgX3JldCkge1xyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLWxhYmVsIHNsb3Q9XCJsYWJlbFwiPiR7X2Zvcm1hdChfa2V5KX08L3VpLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktaW5wdXQgY2xhc3M9XCJwdHMtc3RyaW5nXCIgZGF0YS1rZXk9XCIke19rZXl9XCIgc2xvdD1cImNvbnRlbnRcIiB2YWx1ZT1cIiR7X3JldH1cIj48L3VpLWlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVpLWxhYmVsIHNsb3Q9XCJsYWJlbFwiPiR7X2Zvcm1hdChfa2V5KX08L3VpLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktbnVtLWlucHV0IGNsYXNzPVwicHRzLW51bWJlclwiIHNsb3Q9XCJjb250ZW50XCIgdmFsdWU9XCIke19yZXR9XCIgZGF0YS1rZXk9XCIke19rZXl9XCI+PC91aS1udW0taW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91aS1wcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ2JpZ2ludCc6XHJcbiAgICAgICAgICAgICAgICBfZGl2ID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDx1aS1wcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktbGFiZWwgc2xvdD1cImxhYmVsXCI+JHtfZm9ybWF0KF9rZXkpfTwvdWktbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1udW0taW5wdXQgc2xvdD1cImNvbnRlbnRcIiB2YWx1ZT1cIiR7X3JldH1cIiBkYXRhLWtleT1cIiR7X2tleX1cIiBjbGFzcz1cInB0cy1iaWdpbnRcIj48L3VpLW51bS1pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8L3VpLXByb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICBfZGl2ID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDx1aS1wcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktbGFiZWwgc2xvdD1cImxhYmVsXCI+JHtfZm9ybWF0KF9rZXkpfTwvdWktbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1jaGVja2JveCBjbGFzcz1cInB0cy1jaGVja2JveFwiIGRhdGEta2V5PVwiJHtfa2V5fVwiIHNsb3Q9XCJjb250ZW50XCI8L3VpLWNoZWNrYm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdzeW1ib2wnOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IGA8cD4ke19rZXl9IC0tLSAke19yZXQudG9TdHJpbmcoKX08L3A+YFxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICAgICAgICAgIF9kaXYgPSBgPHA+JHtfa2V5fSAtLS0gJHtfcmV0fTwvcD5gXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgICAgICAgICAgX2RpdiA9IF9yZXQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgIDx1aS1wcm9wIHRvb2x0aXA9XCJUaGlzIHByb3BlcnR5IGlzIG51bGwuIFBsZWFzZSBlZGl0IGl0IG1hbnVhbHlcIiByZWFkb25seT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1sYWJlbD4ke19mb3JtYXQoX2tleSl9PC91aS1sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1pY29uIGRlZmF1bHQ9XCJvcGVyYXRpb25cIiB2YWx1ZT1cIndhcm5cIj48L3VpLWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWktaW5wdXQgc2xvdD1cImNvbnRlbnRcIiB0eXBlPVwiZGFuZ2VyXCIgb3V0bGluZSB2YWx1ZT1cIk5VTExcIj48L3VpLWlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWktcHJvcD5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICA8dWktc2VjdGlvbiBleHBhbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1aS1sYWJlbCBzbG90PVwiaGVhZGVyXCI+JHtfZm9ybWF0KF9rZXkpfTwvdWktbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke19rZXl9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke190b0hUTUwoX3JldCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWktc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XHJcbiAgICAgICAgICAgICAgICBfZGl2ID0gYDx1aS1tYXJrZG93bj4ke19rZXl9ID4+ICR7X3JldC50b1N0cmluZygpfTwvdWktbWFya2Rvd24+YFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfdG90YWwgKyBfZGl2ICsgJzxicj4nXHJcbiAgICB9ICwgXCJcIilcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb25DaGFuZ2UoLi4uYXlueTogYW55W10pIHtcclxuICAgIGNvbnNvbGUubG9nKCd1aS1hc3NldCBjaGFuZ2VkLTI6ICcsIC4uLmF5bnkpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFBhbmVsVGhpcykge1xyXG5cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgdGhpc1snb25DaGFuZ2UnXSA9IGZ1bmN0aW9uIG9uQ2hhbmdlKC4uLmFueTogYW55W10pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndWktYXNzZXQgY2hhbmdlZDogJywgLi4uYW55KTtcclxuICAgIH1cclxuICAgIF9fZGlybmFtZVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlKHRoaXM6IFBhbmVsVGhpcywgKSB7XHJcbn07XHJcbiJdfQ==