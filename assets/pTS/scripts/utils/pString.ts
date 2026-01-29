
const __list_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const _ = {
    uid(length: number = 16) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const _rand = Math.floor(Math.random() * __list_.length);
            result += __list_.charAt(_rand);
        }
        return result;
    },

    cut(input: string, length: number = 20) {
        return input.length <= length ? input : input.slice(0, length) + '...';
    },

    kmb(num: number, positive: string = "", negative: string = "-"): string {
        if (!isFinite(num)) return "0";

        const _abs = Math.abs(num);
        const _units = ["", "K", "M", "B", "T", "Q"];

        let _unitIdx = 0;
        let _value = _abs;

        while(_value >= 1000 && _unitIdx < _units.length - 1) {
            _value /= 1000;
            _unitIdx++;
        }

        const _str = _unitIdx === 0 ? _abs.toFixed(2) : _value.toFixed(2).replace(/\.?0+$/, "");
        const _sign = num >= 0 ? positive : negative;

        return `${_sign}${_str}${_units[_unitIdx]}`;
    },

    random(devided: boolean = false) {
        const _rand = Math.random() * 26 >> 0;
        const _step = devided ? ( Math.random() < 0.5 ? 65 : 97 ) : 65;
        return String.fromCharCode(_rand + _step);
    }
}

export default _;
