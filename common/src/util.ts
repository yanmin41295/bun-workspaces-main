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