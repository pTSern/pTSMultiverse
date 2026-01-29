import { pArray, pDriver } from "../utils";


namespace _ {
    export class x {}

    type _TEvents = 'onComplete'
    interface _IComplete<_TKeys extends pFlex.TKey> {
        key: _TKeys;
        amount: number;
    }

    export class Manager<_TKeys extends pFlex.TKey, _TEvents extends pFlex.TKey> extends pDriver.Handler<_TEvents | _TEvents> {
        complete(what: pFlex.TArray<_IComplete<_TKeys>>, ...whats: _IComplete<_TKeys>[]) {
            whats = pArray.flatter(what, ...whats);

        }

    }

}

export default _;
