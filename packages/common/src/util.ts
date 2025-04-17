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