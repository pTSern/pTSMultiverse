
type _TFinder<TType> = (curr: TType, prev: TType, value: TType) => boolean;
const _hSmallerFinder: _TFinder<number> = (curr, prev, value) => (curr <= value && curr > prev)

const _ = {
    shift(arr: number[], vcenter: number): number[] {
        if (arr.length === 0) return [];

        const _valueIndex = arr.indexOf(vcenter);
        if (_valueIndex === -1) return [...arr];

        const _centerIndex = Math.floor((arr.length - 1) / 2);

        const _rotateCount = (_valueIndex - _centerIndex + arr.length) % arr.length;

        return [
            ...arr.slice(_rotateCount),
            ...arr.slice(0, _rotateCount)
        ];
    },

    flatter<T, TIsReadonly extends boolean = false>(target: pFlex.TArray<T, TIsReadonly>, ...targets: T[]): T[] {
        if(target === undefined && targets.length <= 0) return[]
        //@ts-ignore
        return [target, ...targets].flat();
    },

    findSmallerNearest<T>(list: T[], prop: pFlex.TKeyOf<T, number>, value: number, mechanic: _TFinder<number> = _hSmallerFinder) {
        return list.reduce((prev, curr) => {
            if(curr[prop] === undefined || typeof curr[prop] === 'number') {
                const _curr = curr[prop] as number;
                const _prev = prev ? prev[prop] as number : Number.NEGATIVE_INFINITY;
                if(mechanic(_curr, _prev, value)) return curr;
            }
            return prev;
        }, undefined as T | undefined)
    },

    shuffle<TType>(array: TType[]) {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    extract_equally(arr: number[], data: number[][] = []) {
        if(arr.every(a => a <= 0)) return data;

        const _min = this.min(arr, 0);
        const _root = arr.map(a => Math.max(a - _min, 0));
        const _left = arr.map(() => _min);
        data.push(_left);

        return this.extractEqually(_root, data);
    },

    min(arr: number[], above: number = 0) {
        arr = arr.filter( e => e > above );
        return Math.min(...arr);
    },

    no_dup<T>(array: T[], property: keyof T): T[] {
        const uniqueMap = new Map<any, T>();
        array.forEach(item => {
            const key = item[property];
            uniqueMap.set(key, item);
        });
        return Array.from(uniqueMap.values());
    }
}

export default _;
