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
