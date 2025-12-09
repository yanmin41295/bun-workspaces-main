import {z, ZodString, ZodNumber, ZodBoolean, ZodObject, ZodArray, ZodDate, ZodTypeAny} from "zod";
import {E} from "vitest/dist/chunks/reporters.d.CqBhtcTq.js";

function parseStr(input: string) {
    try {
        return JSON.parse(input) as boolean | null | object
    } catch (e) {
        return input
    }
}

function isObject(value: any): value is object {
    return value !== null && typeof value === 'object';
}

export function parseJsonDeep(input: string) {
    const result = parseStr(input);
    if (result === null || typeof result === 'boolean' || typeof result === 'string') {
        return result;
    }
    return parseObjectDeep(result)
}

function parseObjectDeep(input: object) {
    const inputObj = input as { [key: string]: any }
    for (const inputKey in inputObj) {
        let value = inputObj[inputKey];
        if (Array.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                const datum = value[index]
                if (isObject(datum)) {
                    value[index] = parseObjectDeep(datum)
                } else if (typeof datum === 'string') {
                    value[index] = parseJsonDeep(datum);
                }
            }
        } else if (isObject(value)) {
            inputObj[inputKey] = parseObjectDeep(value) as object;
        } else if (typeof value === 'string') {
            inputObj[inputKey] = parseJsonDeep(value);
        }
    }
    return input
}


/**
 * 实现深度拷贝功能
 * @param value 需要进行深度拷贝的值，可以是对象、数组或者基本类型
 * @returns 深度拷贝后的新值
 */
function deepClone<T>(value: T): T {
    // 处理基本类型和函数，直接返回原值
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    if (Array.isArray(value)) {
        // 处理数组
        const newArray = new Array(value.length) as any[];
        for (let i = 0; i < value.length; i++) {
            newArray[i] = deepClone(value[i]);
        }
        return newArray as T;
    }

    // 处理普通对象
    const newObject = {} as Record<string, any>;
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            newObject[key] = deepClone(value[key]);
        }
    }
    return newObject as T;
}

export function formatFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return `${size.toFixed(2)} ${units[index]}`;
}

export function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleString('zh-CN');
}

// 核心类型映射：将 TypeScript 类型映射为 Zod 类型
export type TypeToZod<T> =
    T extends string ? ZodString :
        T extends number ? ZodNumber :
            T extends boolean ? ZodBoolean :
                T extends Date ? ZodDate :
                    T extends Array<infer U> ? ZodArray<TypeToZod<U>> :
                        T extends object ? ZodObject<{ [K in keyof T]: TypeToZod<T[K]> }> :
                            z.ZodAny; // 其他类型默认 any

/**
 * 根据对象实例动态生成 Zod schema
 * @param obj 输入对象实例
 * @returns 对应的 Zod schema
 */
/**
 * 根据已知类型的对象样本生成 Zod schema
 * @param sample 类型样本（仅用于类型推断，运行时可传空对象）
 * @returns 与样本类型匹配的 Zod schema
 */
export function createZodSchema<T>(sample: T): TypeToZod<T> {
    // 运行时生成逻辑（复用之前的动态生成函数）
    return objectToZodSchema(sample) as TypeToZod<T>;
}

// 复用之前的运行时生成函数（确保类型映射正确）
export function objectToZodSchema(obj: any): ZodTypeAny {
    if (obj === null) return z.null();
    const type = typeof obj;
    switch (type) {
        case "string":
            return z.string();
        case "number":
            return z.number();
        case "boolean":
            return z.boolean();
        case "undefined":
            return z.undefined();
    }
    if (Array.isArray(obj)) {
        return z.array(obj.length ? objectToZodSchema(obj[0]) : z.any());
    }
    if (type === "object") {
        if (obj instanceof Date) return z.date();
        const shape: Record<string, ZodTypeAny> = {};
        for (const [k, v] of Object.entries(obj)) shape[k] = objectToZodSchema(v);
        return z.object(shape);
    }
    return z.any();
}


/**
 * Proxy工具函数，用于判断属性是否为类的方法名
 */

/**
 * 判断属性是否为类的方法名
 * @param target 目标对象
 * @param prop 属性名
 * @returns 如果属性是方法则返回true，否则返回false
 */
export function isClassMethod(target: any, prop: PropertyKey): boolean {
    // 获取属性值
    const descriptor = Object.getOwnPropertyDescriptor(target, prop) ||
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), prop);

    // 检查是否为函数
    if (descriptor && typeof descriptor.value === 'function') {
        return true;
    }

    // 检查原型链上的方法
    const proto = Object.getPrototypeOf(target);
    if (proto && proto !== Object.prototype) {
        const protoDescriptor = Object.getOwnPropertyDescriptor(proto, prop);
        if (protoDescriptor && typeof protoDescriptor.value === 'function') {
            return true;
        }
    }

    return false;
}

/**
 * 创建代理对象，在访问属性时可以判断是否为方法
 * @param target 目标对象
 * @param onMethodAccess 当访问方法时的回调
 * @param onPropertyAccess 当访问普通属性时的回调
 * @returns 代理对象
 */
export function createMethodAwareProxy<T extends object>(
    target: T,
    onMethodAccess?: (prop: PropertyKey, target: T) => void,
    onPropertyAccess?: (prop: PropertyKey, target: T) => void
): T {
    return new Proxy(target, {
        get(obj, prop, receiver) {
            // 检查是否为方法
            if (isClassMethod(obj, prop)) {
                onMethodAccess?.(prop, obj);
            } else {
                onPropertyAccess?.(prop, obj);
            }

            // 返回原始值
            return Reflect.get(obj, prop, receiver);
        }
    });
}

/**
 * 对象方法遍历工具
 */

/**
 * 遍历对象的所有方法
 * @param obj 要遍历的对象
 * @param callback 回调函数，接收方法名和方法引用作为参数
 */
export function forEachMethod(
    obj: any,
    callback: (methodName: string, method: Function, target: any) => void
): void {
    if (!obj) return;

    // 遍历对象自身的所有属性
    Object.getOwnPropertyNames(obj).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor && typeof descriptor.value === 'function') {
            callback(key, descriptor.value, obj);
        }
    });

    // 遍历原型链上的方法
    let proto = Object.getPrototypeOf(obj);
    if (proto && proto !== Object.prototype) {
        Object.getOwnPropertyNames(proto).forEach(key => {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (descriptor && typeof descriptor.value === 'function' && !obj.hasOwnProperty(key)) {
                callback(key, descriptor.value, obj);
            }
        });
        // proto = Object.getPrototypeOf(proto);
    }
}

/**
 * 获取对象的所有方法名
 * @param obj 目标对象
 * @returns 包含所有方法名的数组
 */
export function getMethodNames(obj: any): string[] {
    const methodNames: string[] = [];

    forEachMethod(obj, (methodName) => {
        methodNames.push(methodName);
    });

    return methodNames;
}

/**
 * 检查属性是否为方法
 * @param obj 目标对象
 * @param prop 属性名
 * @returns 如果属性是方法则返回true，否则返回false
 */
export function isMethod(obj: any, prop: PropertyKey): boolean {
    if (!obj || !prop) return false;

    const descriptor = Object.getOwnPropertyDescriptor(obj, prop) ||
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), prop);

    if (descriptor && typeof descriptor.value === 'function') {
        return true;
    }

    return typeof obj[prop] === 'function';
}

/**
 * 获取对象的所有方法
 * @param obj 目标对象
 * @returns 包含所有方法名和方法引用的对象
 */
export function getAllMethods(obj: any): Record<string, Function> {
    const methods: Record<string, Function> = {};

    forEachMethod(obj, (methodName, method) => {
        methods[methodName] = method;
    });

    return methods;
}

/**
 * 获取对象实例本身的所有方法（不包括父类方法）
 * @param obj 目标对象
 * @returns 包含所有自身方法名和方法引用的对象
 */
export function getOwnMethods(obj: any): Record<string, Function> {
    const methods: Record<string, Function> = {};
    if (!obj) return methods;
    // 只遍历对象自身的属性，不包括原型链
    Object.getOwnPropertyNames(obj).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        // 检查是否是函数且是自身属性
        if (descriptor && typeof descriptor.value === 'function') {
            methods[key] = descriptor.value;
        }
    });

    return methods;
}

/**
 * 获取类实例自身的所有方法（不包括构造函数和继承的方法）
 * @param instance 类实例对象
 * @returns 包含所有自身方法名和方法引用的对象
 */
export function getInstanceOwnMethods(instance: any): Record<string, Function> {
    const methods: Record<string, Function> = {};
    if (!instance) return methods;

    // 获取对象自身的所有属性名
    const ownPropertyNames = Object.getOwnPropertyNames(instance);

    for (const propertyName of ownPropertyNames) {
        // 排除构造函数
        if (propertyName === 'constructor') {
            continue;
        }

        // 获取属性描述符
        const descriptor = Object.getOwnPropertyDescriptor(instance, propertyName);

        // 检查是否是函数
        if (descriptor && typeof descriptor.value === 'function') {
            methods[propertyName] = descriptor.value;
        }
    }

    return methods;
}

/**
 * 条件类型：根据布尔值选择不同类型的工具类型
 * 当布尔值为 true 时，类型为 T；当布尔值为 false 时，类型为 F
 */
export type If<Condition extends boolean, T, F> = Condition extends true ? T : F;
