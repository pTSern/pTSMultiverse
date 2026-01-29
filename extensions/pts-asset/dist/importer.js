"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
module.exports.load = async function (uuid, opt) {
    const source = fs_1.default.readFileSync(opt.fspath, 'utf8');
    let _js = {};
    try {
        _js = JSON.parse(source);
    }
    catch (e) {
        console.error("Failed to parse JSON:", e);
        _js = {};
    }
    const _uuid = await Editor.Message.request('asset-db', 'query-uuid', 'db://assets/pTS/scripts/component/pTSAsset.ts');
    if (!_uuid) {
        console.error("Failed to query UUID for pTSAsset.ts");
        return;
    }
    const asset = {
        "__type__": _uuid,
        "json": _js
    };
    return JSON.stringify(asset);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zb3VyY2UvaW1wb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBb0I7QUFFcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxXQUFVLElBQVksRUFBRSxHQUFRO0lBQ3ZELE1BQU0sTUFBTSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVuRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixJQUFJLENBQUM7UUFDRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQUMsT0FBTSxDQUFDLEVBQUUsQ0FBQztRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsK0NBQStDLENBQUMsQ0FBQTtJQUNySCxJQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDdEQsT0FBTztJQUNYLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRztRQUNWLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLE1BQU0sRUFBRSxHQUFHO0tBQ2QsQ0FBQTtJQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMubG9hZCA9IGFzeW5jIGZ1bmN0aW9uKHV1aWQ6IHN0cmluZywgb3B0OiBhbnkpIHtcclxuICAgIGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYyhvcHQuZnNwYXRoLCAndXRmOCcpO1xyXG5cclxuICAgIGxldCBfanMgPSB7fTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgX2pzID0gSlNPTi5wYXJzZShzb3VyY2UpO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBwYXJzZSBKU09OOlwiLCBlKTtcclxuICAgICAgICBfanMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF91dWlkID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktdXVpZCcsICdkYjovL2Fzc2V0cy9wVFMvc2NyaXB0cy9jb21wb25lbnQvcFRTQXNzZXQudHMnKVxyXG4gICAgaWYoIV91dWlkKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBxdWVyeSBVVUlEIGZvciBwVFNBc3NldC50c1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXNzZXQgPSB7XHJcbiAgICAgICAgXCJfX3R5cGVfX1wiOiBfdXVpZCxcclxuICAgICAgICBcImpzb25cIjogX2pzXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFzc2V0KTtcclxufVxyXG4iXX0=