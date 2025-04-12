import {type CallBack} from "./types.ts";

export async function sleep(milliseconds: number) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, milliseconds)
    })
}

export function waiting(time: number) {
    let start = Date.now()
    while (Date.now() - start < time) {
    }
}

export type NonFuntionType = number | object | undefined | string | bigint | void | null | symbol
export type FunctionType<R = void> = (...args: any[]) => R


// 定义一个工具类型，用于移除函数的最后一个参数（假设最后一个参数是回调函数）
export type RemoveLast<T extends any[]> = T extends [...infer U, any] ? U : never;

// 定义一个工具类型，用于获取函数的最后一个参数类型（假设最后一个参数是回调函数）
export type Last<T extends any[]> = T extends [...any, infer L] ? L : never;

// 定义一个工具类型，用于获取回调函数的返回类型
export type CallbackReturnType<T extends FunctionType> = Last<Parameters<T>>;

export type CallbackErrorType<T extends FunctionType> =
    Last<Parameters<T>> extends CallBack<infer R, infer E> ? E : never;

type ResolveType<T> = (value: T | PromiseLike<T>) => void
type RejectType<E = any> = (reason: E) => void

type Result<T, E> = {
    error: E
    data: T
}

type ErrorResults<T> = Result<T extends undefined ? undefined : T, never>

/**
 * 将
 * @param fun
 */
export function promisify<T extends FunctionType>(fun: T): (...args: RemoveLast<Parameters<T>>) => Promise<CallbackReturnType<T>> {
    return function (...args: RemoveLast<Parameters<T>>): Promise<CallbackReturnType<T>> {
        return new Promise((resolve, reject) => {
            const callback = (err: CallbackErrorType<T>, data: CallbackReturnType<T>) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            };
            fun(...args, callback);
        });
    };
}

export function promisifyCallBack<T extends FunctionType, D, E = any>(fun: T,
                                                                      callbackBuilder: (resolve: ResolveType<D>, reject: RejectType<E>) => Last<Parameters<T>>):
    (...args: RemoveLast<Parameters<T>>) => Promise<D> {
    return async function (...args: RemoveLast<Parameters<T>>): Promise<D> {
        return new Promise((resolve, reject) => {
            const funCallBack = callbackBuilder(resolve, reject)
            fun(...args, funCallBack);
        });
    };
}

/**
 * 调用带有回调函数的方法
 * @param fun  一个函数，这个函数的最后一个参数必须是标准的回调函数
 * @param args
 */
export async function asyncCall<T extends (...args: any[]) => void>(fun: T, ...args: RemoveLast<Parameters<T>>): Promise<CallbackReturnType<T>> {
    const promisifyFun = promisify(fun)
    return await promisifyFun(...args)
}

type IsPromise<T> = T extends Promise<any> ? true : false;
type NonPromiseFunction<T extends (...args: any[]) => any> = IsPromise<ReturnType<T>> extends true ? never : T;
type ErrorResult<T, U = any> = [undefined, Awaited<T>] | [U, undefined]

export function isPromise<T>(value: any): value is Promise<T> {
    return value?.constructor === Promise;
}

export async function promiseCatch<T, U = any>(promise: Promise<T>): Promise<[undefined, Awaited<T>] | [U, undefined]> {
    try {
        const result = await promise
        return [undefined, result];
    } catch (e) {
        return [e, undefined] as [U, undefined];
    }
}

export class AsyncLock {
    // 用于标记锁是否被占用
    private isLocked: boolean = false;
    // 存储等待获取锁的 Promise 的 resolve 函数队列
    private waitingQueue: ((value: void | PromiseLike<void>) => void)[] = [];

    // 尝试获取锁的方法
    async acquire(): Promise<void> {
        if (this.isLocked) {
            // 如果锁已经被占用，将当前操作加入等待队列
            await new Promise<void>((resolve) => {
                this.waitingQueue.push(resolve);
            });
        }
        // 标记锁为已占用
        this.isLocked = true;
    }

    // 释放锁的方法
    release(): void {
        if (this.waitingQueue.length > 0) {
            // 如果等待队列中有等待的操作，取出队列中的第一个操作并执行其 resolve 函数
            const next = this.waitingQueue.shift();
            if (next) {
                next();
            }
        } else {
            // 如果等待队列为空，标记锁为未占用
            this.isLocked = false;
        }
    }
}

