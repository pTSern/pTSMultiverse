export const LOGS = ['log', 'warn', 'error'] as const;

export const SINGLETON_KEY = Symbol('__pTS_instance__');
export const SINGLETON_GETTER = Symbol('__pTS_get_instance__');
export const SINGLETON_OPTION = Symbol('__pTS_option__');
export const LOG_LEVEL = 0

export const POOL: Record<string, pFlex.TFunc> = {};

