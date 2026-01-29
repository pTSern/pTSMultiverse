import * as cm from 'cc/userland/macro'

class _Debugger {
    register(alias: string, who: any): void {
        alias; who;
    }

}

class _Real extends _Debugger {
    constructor() {
        super();
        window['_pTS'] = {}
    }

    protected get _() { return window['_pTS'] }

    register(alias: string, who: any): void {
        this._[alias] = who;
    }
}


const _ = cm.IS_PRODUCT ? new _Real() : new _Debugger();

export default _;
