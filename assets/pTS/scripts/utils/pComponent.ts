import * as cc from 'cc';

import pArray from "./pArray";
import pClass from "./pClass";

namespace pComponent {
    export type TFlexTarget = cc.Node | { node: cc.Node }

    export function getNode(target: TFlexTarget): cc.Node {
        return target instanceof cc.Node ? target : target?.node || null;
    }

    export function getSafeComp<T extends cc.Component>(target: TFlexTarget, comp: pFlex.TCtor<any, T> | pFlex.TCtor<any, T, true>): T {
        if(!target || !comp) return null;

        const node = getNode(target);
        if(!node) return null;

        return node.getComponent(comp) || node.addComponent(comp as pFlex.TCtor<any, T>);
    }

    export function binds(targets: pFlex.TArray<TFlexTarget>, event: string, funcs: pFlex.TArray<pFlex.THandler>) {
        if(!targets || !event || !funcs) return;
        targets = pArray.flatter(targets)
        funcs = pArray.flatter(funcs)

        const _funcs = pClass.mapper(funcs);
        const _func = () => pClass.emit(_funcs);

        targets.forEach( _target => {
            if(!_target) return;

            const _node = getNode(_target);
            if(!_node) return;

            _node.on(event, _func);
        })
    }

    export function alignCameras(camera: pFlex.TArray<cc.Camera>, ...cameras: cc.Camera[]) {
        cameras = pArray.flatter(camera, ...cameras);
        const _visible = cc.view.getVisibleSize();

        for(const _camera of cameras) {
            if (_camera.targetTexture) {
                _camera.orthoHeight = _visible.height / 2;
            } else {
                const size = cc.screen.windowSize;
                _camera.orthoHeight = size.height / cc.view.getScaleY() / 2;
            }

            const _canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
            const _wp = _canvas.node.getWorldPosition();
            _camera.node.setWorldPosition(_wp.x, _wp.y, 1000);
        }
    }
}

export default pComponent;
