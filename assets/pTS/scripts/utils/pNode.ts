
import { IVec3Like, Node, v3 } from 'cc'
import pArray from './pArray';
import pNumber from './pNumber';
import pComponent from './pComponent';

namespace _ {
    interface _IComp { node: Node }
    export type TNode = Node | _IComp

    interface _IGetChildOpt {
        name: string;
        out?: pFlex.TFunc<Node, void>
    }

    interface _IPosition<_TPosition extends IVec3Like> {
        position: _TPosition;
        is_world: boolean;
    }

    export type TPosition<_TPosition extends IVec3Like = IVec3Like> = TNode | _TPosition | _IPosition<_TPosition>
    function _isPosition<_TPosition extends IVec3Like>(target: any): target is _IPosition<_TPosition> {
        return 'position' in target && 'is_world' in target;
    }

    export function getChildrenByName<const _T extends readonly _IGetChildOpt[]>(parent: TNode, opts: _T): pFlex.TExtracter<_T, 'name', Node> {
        parent = parent instanceof Node ? parent : parent.node;

        return opts.reduce( (_data, _current) => {
            const { name, out } = _current;

            _data[name] = parent.getChildByName(name);
            out && out(_data[name]);

            return _data
        }, { } as any)
    }

    export function setPosition<_TPos extends IVec3Like>(_target: TNode, _pos: TPosition<_TPos>, _dif?: _TPos) {
        _target = _target instanceof Node ? _target : _target.node;
        const dif = _dif || { x: 0, y: 0, z: 0 };

        if(_pos instanceof Node) {
            const _vec = pNumber.add('Vec3', _pos.worldPosition, dif);
            _target.setWorldPosition(_vec);
            return;
        }

        if('node' in _pos) {
            const _vec = pNumber.add('Vec3', _pos.node.worldPosition, dif);
            _target.setWorldPosition(_vec);
            return;
        }

        if(_isPosition(_pos)) {
            const { position, is_world } = _pos;
            const { x, y, z } = _getPosition(position);

            is_world ? _target.setWorldPosition(x + dif.x, y + dif.y, z + dif.z) : _target.setPosition(x + dif.x, y + dif.y, z + dif.z)
            return;
        }

        const { x, y, z } = _getPosition(_pos);
        _target.setPosition(x + dif.x, y + dif.y, z + dif.z);
    }

    export function getLocalPos() {

    }

    function _getPosition<_TPos extends IVec3Like>(_pos: _TPos) {
        const { x, y } = _pos;
        const z = 'z' in _pos ? _pos.z : 0;
        return { x, y, z };
    }
}

export default _;
