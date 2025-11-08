export const isObject = (val) => {
    return val !== null && typeof val === "object";
};
export const extend = Object.assign;

export function hasChanged(value, oldValue) {
    return !Object.is(value, oldValue);
}
/**
 * 检查给定的值是否为函数类型
 * @param value - 需要检查的值
 * @returns 如果值是函数则返回 true，否则返回 false
 */
export function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
}

/**
 * 检查给定的值是否为 Promise 类型
 * @param value - 需要检查的值
 * @returns 如果值是 Promise 则返回 true，否则返回 false
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
    return value instanceof Promise ||
        (value !== null &&
            typeof value === 'object' &&
            typeof (value as Promise<T>).then === 'function');
}
