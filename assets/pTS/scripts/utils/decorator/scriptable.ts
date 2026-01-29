import { EDITOR } from 'cc/env';

export function scriptable(name: string) {
    if (EDITOR) {
        return function () {};
    }

    return function (constructor: Function) {
        const g = globalThis as any;
        g.pTScript ||= {};
        g.pTScript[name] = constructor;
        console.log('Register Scriptable:', name, constructor);
    };
}
