import { Asset as _Assets, _decorator } from 'cc'
import { pDriver } from '../utils';
const { property } = _decorator;

export abstract class Asset<_TKeys extends pFlex.TKey> extends _Assets {
    protected _owner: pDriver.Handler<_TKeys> = null;

    add(listener: pFlex.TArray<pFlex.TFunc>, ...listeners: pFlex.TFunc[]) {

    }

}
