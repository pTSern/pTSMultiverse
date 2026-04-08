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
        console.log("onSelectionSelect >>", type, uuid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQTRFQSxvQkFHQztBQU1ELHdCQUVDO0FBdEZELG1FQUFrQztBQUNsQzs7O0dBR0c7QUFDVSxRQUFBLE9BQU8sR0FBNEM7SUFDNUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGFBQWEsQ0FBQyxFQUFPO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQVc7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDMUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBWSxFQUFFLEdBQWE7UUFDM0MsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxzREFBc0Q7UUFDMUQsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDO0lBQ3BCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFHLElBQUksS0FBSyxPQUFPO1lBQUUsT0FBTztRQUM1QixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUUvRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxXQUFXLENBQUMsR0FBRyxJQUFXO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpDLENBQUM7Q0FFSixDQUFDO0FBRUYsS0FBSyxVQUFVLEtBQUs7SUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtJQUV0RyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsRUFBRTtRQUNqQyxJQUFHLE1BQU0sQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUU5QixNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEYsSUFBRyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ2xCLElBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQ3pDLElBQUcsS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLO1lBQUMsT0FBTTtRQUVsQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV2QixNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEYsSUFBRyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRWxCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUcsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbEMsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRXpFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVEOzs7R0FHRztBQUNJLEtBQUssVUFBVSxJQUFJO0lBQ3RCLEtBQUssRUFBRSxDQUFDO0lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixNQUFNO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUN0QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQganNvbiBmcm9tICcuLi9wYWNrYWdlLmpzb24nXHJcbi8qKlxyXG4gKiBAZW4gUmVnaXN0cmF0aW9uIG1ldGhvZCBmb3IgdGhlIG1haW4gcHJvY2VzcyBvZiBFeHRlbnNpb25cclxuICogQHpoIOS4uuaJqeWxleeahOS4u+i/m+eoi+eahOazqOWGjOaWueazlVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1ldGhvZHM6IHsgW2tleTogc3RyaW5nXTogKC4uLmFueTogYW55KSA9PiBhbnkgfSA9IHtcclxuICAgIC8qKlxyXG4gICAgICogQGVuIEEgbWV0aG9kIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBieSBtZXNzYWdlXHJcbiAgICAgKiBAemgg6YCa6L+HIG1lc3NhZ2Ug6Kem5Y+R55qE5pa55rOVXHJcbiAgICAgKi9cclxuICAgIHNob3dMb2coKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0hlbGxvIFdvcmxkJyk7XHJcbiAgICB9LFxyXG4gICAgb25DcmVhdGVNZW51WChhaTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uQ3JlYXRlTWVudScsIGFpKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyByZWdpc3Rlcih1cmwsIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTQ1JJUFRBQkxFID4+XCIsIHVybCwgLi4uYXJncylcclxuICAgICAgICBjb25zdCBfb3V0ID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktYXNzZXQtaW5mbycsIHVybClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk91dHB1dCBSZWdpc3RlcmVkIEFzc2V0OlwiLCBfb3V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgXCJzZWxlY3Rpb246Y2hhbmdlZFwiKHR5cGU6IHN0cmluZywgaWRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnYXNzZXQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBBc3NldCBVVUlEczonLCBpZHMpO1xyXG4gICAgICAgICAgICAvLyBpZHNbMF0gaXMgdGhlIFVVSUQgb2YgdGhlIGN1cnJlbnRseSBpbnNwZWN0ZWQgYXNzZXRcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVsb2FkKCkgeyBfbG9hZCgpIH0sXHJcbiAgICBhc3luYyBvblNlbGVjdGlvblNlbGVjdCh0eXBlOiBzdHJpbmcsIHV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25TZWxlY3Rpb25TZWxlY3QgPj5cIiwgdHlwZSwgdXVpZCk7XHJcbiAgICAgICAgaWYodHlwZSAhPT0gJ2Fzc2V0JykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IF9vdXQgPSBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdxdWVyeS1hc3NldC1pbmZvJywgdXVpZClcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPdXRwdXQgU2VsZWN0ZWQgQXNzZXRzOlwiLCBfb3V0KTtcclxuICAgIH0sXHJcbiAgICBvbk9wZW5QYW5lbCguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25PcGVuUGFuZWwgPj5cIiwgLi4uYXJncylcclxuICAgICAgICBFZGl0b3IuUGFuZWwub3Blbihqc29uLm5hbWUpO1xyXG5cclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gX2xvYWQoKSB7XHJcbiAgICBjb25zdCBfYWxsID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktYXNzZXRzJywgeyBwYXR0ZXJuOiBcImRiOi8vYXNzZXRzLyoqLypcIiB9KVxyXG5cclxuICAgIGNvbnN0IF9wcm0gPSBfYWxsLm1hcChhc3luYyBfYXNzZXQgPT4ge1xyXG4gICAgICAgIGlmKF9hc3NldC5pc0RpcmVjdG9yeSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBfbWV0YSA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LW1ldGEnLCBfYXNzZXQudXVpZCk7XHJcblxyXG4gICAgICAgIGlmKCFfbWV0YSkgcmV0dXJuO1xyXG4gICAgICAgIGlmKCFfbWV0YS5maWxlcy5pbmNsdWRlcygnLnB0cycpKSByZXR1cm47XHJcbiAgICAgICAgaWYoX21ldGEuaW1wb3J0ZXIgPT09ICdwdHMnKXJldHVybiBcclxuXHJcbiAgICAgICAgX21ldGEuaW1wb3J0ZXIgPSAncHRzJztcclxuXHJcbiAgICAgICAgY29uc3QgX2luZm8gPSBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdxdWVyeS1hc3NldC1pbmZvJywgX2Fzc2V0LnV1aWQpO1xyXG4gICAgICAgIGlmKCFfaW5mbykgcmV0dXJuO1xyXG5cclxuICAgICAgICByZXR1cm4gRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAnc2F2ZS1hc3NldC1tZXRhJywgX2luZm8udXVpZCwgSlNPTi5zdHJpbmdpZnkoX21ldGEsIG51bGwsIDIpKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBmID0gYXdhaXQgUHJvbWlzZS5hbGwoX3BybSk7XHJcblxyXG4gICAgYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncmVmcmVzaC1hc3NldCcsIFwiZGI6Ly9hc3NldHNcIik7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJQVFMgSW1wb3J0ZXIgYXNzaWduZWQgdG8gYWxsIC5wdHMgZmlsZXMuXCIsIGYpO1xyXG59XHJcblxyXG4vKipcclxuICogQGVuIE1ldGhvZCBUcmlnZ2VyZWQgb24gRXh0ZW5zaW9uIFN0YXJ0dXBcclxuICogQHpoIOaJqeWxleWQr+WKqOaXtuinpuWPkeeahOaWueazlVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWQoKSB7XHJcbiAgICBfbG9hZCgpO1xyXG4gICAgY29uc29sZS5sb2coJ0V4dGVuc2lvbiBsb2FkZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBlbiBNZXRob2QgdHJpZ2dlcmVkIHdoZW4gdW5pbnN0YWxsaW5nIHRoZSBleHRlbnNpb25cclxuICogQHpoIOWNuOi9veaJqeWxleaXtuinpuWPkeeahOaWueazlVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVubG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdFeHRlbnNpb24gdW5sb2FkZWQnKTtcclxufVxyXG4iXX0=