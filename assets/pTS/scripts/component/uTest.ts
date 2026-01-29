import { _decorator, Component, JsonAsset, deserialize, Scene, SceneAsset, assetManager, instantiate, director, Canvas, Prefab } from "cc";
import { pTSAsset } from "./pTSAsset";
import { logger, instance, scriptable, ILogger, singleton } from "../utils/decorator";

const { property, ccclass } = _decorator;

@ccclass("uTest")
@logger()
@scriptable('x')
@singleton({ pooler: true, initer: 'onLoad', destroyer: 'onDestroy' })
export class uTest extends Component {

    @property(JsonAsset)
    pts: pTSAsset = null!;

    protected onLoad(): void {
        const _bn = "pTSurvival";
        const _bd = assetManager.getBundle(_bn);
        this.log("BUNDLE: ", _bd);

        assetManager.loadBundle(_bn, (_err, _bundle) => {
            if(_err) {
                this.error(_err);
                return;
            }
            const _cur = assetManager.getBundle(_bn)
            const _sc = _cur.getSceneInfo('game')
            _cur.loadScene('game', (_err, _scene) => {
                if(_err) {
                    this.error("Load Scene >>", _err);
                    return;
                }
                this.log("SCENE: ", _scene);
            })
            const _s1 = Date.now();
            _cur.load<Prefab>('prefabs/pre2', (_err, _prefab) => {
                if(_err) {
                    this.error("Load Prefab >>", _err);
                    return;
                }
                this.log("PREFAB: ", _prefab, `| Load Time: ${Date.now() - _s1}ms`, _s1);
                const _node = instantiate(_prefab);

                director.getScene().getComponentInChildren(Canvas).node.children[0].addChild(_node);
            })

            const _s2 = Date.now();
            _cur.preload('prefabs/pre', (count, total, item) => {
                this.log(`PRELOADING PREFAB: ${item.id} ${(count / total * 100).toFixed(2)}%`);
            }, (_err, _list) => {
                if(_err) {
                    this.error("Preload Prefab >>", _err);
                    return;
                }
                const _s3 = Date.now();
                this.log("PRELOAD PREFAB: ", _list, `| Preload Time: ${_s3 - _s2}ms`, _s2);
                _cur.load<Prefab>('prefabs/pre', (_err, _prefab) => {
                    this.log("LOAD-PRELOADED PREFAB: ", _prefab, `\n| Load Time: ${Date.now() - _s3}ms`, _s3);
                })

            })
            this.log("SCENE INFO: ", _sc, _cur);
            const _game = _cur.get('game')
            this.log("Game info: ", _game);
        })
    }

    protected start(): void {
        this.log("INSANCE: ", instance(uTest))
    }
}

export interface uTest extends ILogger {}
