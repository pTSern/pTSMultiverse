"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = void 0;
exports.load = load;
exports.unload = unload;
const package_json_1 = __importDefault(require("../package.json"));
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    showLog() {
        console.log('Hello World');
    },
    onCreateMenuX(ai) {
        console.log('onCreateMenu', ai);
    },
    async register(url, ...args) {
        console.log("SCRIPTABLE >>", url, ...args);
        const _out = await Editor.Message.request('asset-db', 'query-asset-info', url);
        console.log("Output Registered Asset:", _out);
    },
    "selection:changed"(type, ids) {
        if (type === 'asset') {
            console.log('Selected Asset UUIDs:', ids);
            // ids[0] is the UUID of the currently inspected asset
        }
    },
    reload() { _load(); },
    async onSelectionSelect(type, uuid) {
        if (type !== 'asset')
            return;
        const _out = await Editor.Message.request('asset-db', 'query-asset-info', uuid);
        console.log("Output Selected Assets:", _out);
    },
    onOpenPanel(...args) {
        console.log("onOpenPanel >>", ...args);
        Editor.Panel.open(package_json_1.default.name);
    },
};
async function _load() {
    const _all = await Editor.Message.request('asset-db', 'query-assets', { pattern: "db://assets/**/*" });
    const _prm = _all.map(async (_asset) => {
        if (_asset.isDirectory)
            return;
        const _meta = await Editor.Message.request('asset-db', 'query-asset-meta', _asset.uuid);
        if (!_meta)
            return;
        if (!_meta.files.includes('.pts'))
            return;
        if (_meta.importer === 'pts')
            return;
        _meta.importer = 'pts';
        const _info = await Editor.Message.request('asset-db', 'query-asset-info', _asset.uuid);
        if (!_info)
            return;
        return Editor.Message.request('asset-db', 'save-asset-meta', _info.uuid, JSON.stringify(_meta, null, 2));
    });
    const f = await Promise.all(_prm);
    await Editor.Message.request('asset-db', 'refresh-asset', "db://assets");
    console.log("PTS Importer assigned to all .pts files.", f);
}
/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
async function load() {
    _load();
    console.log('Extension loaded');
}
/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
function unload() {
    console.log('Extension unloaded');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQTJFQSxvQkFHQztBQU1ELHdCQUVDO0FBckZELG1FQUFrQztBQUNsQzs7O0dBR0c7QUFDVSxRQUFBLE9BQU8sR0FBNEM7SUFDNUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGFBQWEsQ0FBQyxFQUFPO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQVc7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDMUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBWSxFQUFFLEdBQWE7UUFDM0MsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxzREFBc0Q7UUFDMUQsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDO0lBQ3BCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUM5QyxJQUFHLElBQUksS0FBSyxPQUFPO1lBQUUsT0FBTztRQUM1QixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUUvRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxXQUFXLENBQUMsR0FBRyxJQUFXO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpDLENBQUM7Q0FFSixDQUFDO0FBRUYsS0FBSyxVQUFVLEtBQUs7SUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtJQUV0RyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsRUFBRTtRQUNqQyxJQUFHLE1BQU0sQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUU5QixNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEYsSUFBRyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ2xCLElBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQ3pDLElBQUcsS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLO1lBQUMsT0FBTTtRQUVsQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV2QixNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEYsSUFBRyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRWxCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUcsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbEMsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRXpFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVEOzs7R0FHRztBQUNJLEtBQUssVUFBVSxJQUFJO0lBQ3RCLEtBQUssRUFBRSxDQUFDO0lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixNQUFNO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUN0QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQganNvbiBmcm9tICcuLi9wYWNrYWdlLmpzb24nXHJcbi8qKlxyXG4gKiBAZW4gUmVnaXN0cmF0aW9uIG1ldGhvZCBmb3IgdGhlIG1haW4gcHJvY2VzcyBvZiBFeHRlbnNpb25cclxuICogQHpoIOS4uuaJqeWxleeahOS4u+i/m+eoi+eahOazqOWGjOaWueazlVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1ldGhvZHM6IHsgW2tleTogc3RyaW5nXTogKC4uLmFueTogYW55KSA9PiBhbnkgfSA9IHtcclxuICAgIC8qKlxyXG4gICAgICogQGVuIEEgbWV0aG9kIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBieSBtZXNzYWdlXHJcbiAgICAgKiBAemgg6YCa6L+HIG1lc3NhZ2Ug6Kem5Y+R55qE5pa55rOVXHJcbiAgICAgKi9cclxuICAgIHNob3dMb2coKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0hlbGxvIFdvcmxkJyk7XHJcbiAgICB9LFxyXG4gICAgb25DcmVhdGVNZW51WChhaTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uQ3JlYXRlTWVudScsIGFpKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyByZWdpc3Rlcih1cmwsIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTQ1JJUFRBQkxFID4+XCIsIHVybCwgLi4uYXJncylcclxuICAgICAgICBjb25zdCBfb3V0ID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktYXNzZXQtaW5mbycsIHVybClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk91dHB1dCBSZWdpc3RlcmVkIEFzc2V0OlwiLCBfb3V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgXCJzZWxlY3Rpb246Y2hhbmdlZFwiKHR5cGU6IHN0cmluZywgaWRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnYXNzZXQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBBc3NldCBVVUlEczonLCBpZHMpO1xyXG4gICAgICAgICAgICAvLyBpZHNbMF0gaXMgdGhlIFVVSUQgb2YgdGhlIGN1cnJlbnRseSBpbnNwZWN0ZWQgYXNzZXRcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVsb2FkKCkgeyBfbG9hZCgpIH0sXHJcbiAgICBhc3luYyBvblNlbGVjdGlvblNlbGVjdCh0eXBlOiBzdHJpbmcsIHV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHR5cGUgIT09ICdhc3NldCcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBfb3V0ID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktYXNzZXQtaW5mbycsIHV1aWQpXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3V0cHV0IFNlbGVjdGVkIEFzc2V0czpcIiwgX291dCk7XHJcbiAgICB9LFxyXG4gICAgb25PcGVuUGFuZWwoLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uT3BlblBhbmVsID4+XCIsIC4uLmFyZ3MpXHJcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oanNvbi5uYW1lKTtcclxuXHJcbiAgICB9LFxyXG5cclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIF9sb2FkKCkge1xyXG4gICAgY29uc3QgX2FsbCA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0cycsIHsgcGF0dGVybjogXCJkYjovL2Fzc2V0cy8qKi8qXCIgfSlcclxuXHJcbiAgICBjb25zdCBfcHJtID0gX2FsbC5tYXAoYXN5bmMgX2Fzc2V0ID0+IHtcclxuICAgICAgICBpZihfYXNzZXQuaXNEaXJlY3RvcnkpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgX21ldGEgPSBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdxdWVyeS1hc3NldC1tZXRhJywgX2Fzc2V0LnV1aWQpO1xyXG5cclxuICAgICAgICBpZighX21ldGEpIHJldHVybjtcclxuICAgICAgICBpZighX21ldGEuZmlsZXMuaW5jbHVkZXMoJy5wdHMnKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmKF9tZXRhLmltcG9ydGVyID09PSAncHRzJylyZXR1cm4gXHJcblxyXG4gICAgICAgIF9tZXRhLmltcG9ydGVyID0gJ3B0cyc7XHJcblxyXG4gICAgICAgIGNvbnN0IF9pbmZvID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktYXNzZXQtaW5mbycsIF9hc3NldC51dWlkKTtcclxuICAgICAgICBpZighX2luZm8pIHJldHVybjtcclxuXHJcbiAgICAgICAgcmV0dXJuIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3NhdmUtYXNzZXQtbWV0YScsIF9pbmZvLnV1aWQsIEpTT04uc3RyaW5naWZ5KF9tZXRhLCBudWxsLCAyKSlcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZiA9IGF3YWl0IFByb21pc2UuYWxsKF9wcm0pO1xyXG5cclxuICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3JlZnJlc2gtYXNzZXQnLCBcImRiOi8vYXNzZXRzXCIpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiUFRTIEltcG9ydGVyIGFzc2lnbmVkIHRvIGFsbCAucHRzIGZpbGVzLlwiLCBmKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBlbiBNZXRob2QgVHJpZ2dlcmVkIG9uIEV4dGVuc2lvbiBTdGFydHVwXHJcbiAqIEB6aCDmianlsZXlkK/liqjml7bop6blj5HnmoTmlrnms5VcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgX2xvYWQoKTtcclxuICAgIGNvbnNvbGUubG9nKCdFeHRlbnNpb24gbG9hZGVkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZW4gTWV0aG9kIHRyaWdnZXJlZCB3aGVuIHVuaW5zdGFsbGluZyB0aGUgZXh0ZW5zaW9uXHJcbiAqIEB6aCDljbjovb3mianlsZXml7bop6blj5HnmoTmlrnms5VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRXh0ZW5zaW9uIHVubG9hZGVkJyk7XHJcbn1cclxuIl19