export type CatchResult<T> = [undefined, T] | [Error, undefined];

export class ProcessError extends Error {
    data: { [key: string]: string | boolean | number } = {}

    constructor(message: string) {
        super(message);
    }
}

export function catchIgnore<T>(fun: (...args: any) => T, ...args: any): CatchResult<T> {
    try {
        return [undefined, fun(args)]
    } catch (e) {
        return [e as Error, undefined]
    }
}


export function catchThrows<T>(fun: () => T, processError: ProcessError): T {
    const [error, data] = catchIgnore(fun);
    if (error) {
        throw error;
    }
    return data as T;
}

export async function catchIgnoreAsync<T>(fun: () => Promise<T>): Promise<CatchResult<T>> {
    try {
        return [undefined, await fun()]
    } catch (e) {
        return Promise.resolve([e as Error, undefined])
    }
}


export async function catchThrowsAsync<T>(fun: () => Promise<T>, processError: ProcessError): Promise<T> {
    const [error, data] = await catchIgnoreAsync(fun);
    if (error) {
        throw error;
    }
    return data as T;
}



