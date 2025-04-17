import {CallBack} from "../src/types.ts";
import {asyncCall, AsyncLock, promiseCatch, promisify, promisifyCallBack} from "../src/async.ts";
import {UserApi} from "../src/api/UserApi.ts";
import * as console from "node:console";
import {getMethods} from "../src/api/controller.api.ts";
import {describe, expect, test} from "vitest";

describe("promisify args fun", () => {
    const add = function addWithCallback(a: number, b: number, callback: CallBack<number>) {
        const sum = a + b
        callback(null, sum)
    }

    test("promisify with function", async () => {
        const asyncAdd = promisify(add)
        let result = await asyncAdd(1, 2)
        expect(3).toBe(result);
    });

    test("async call", async () => {
        const result = await asyncCall(add, 1, 2);
        expect(3).toBe(result);
    })
});


describe("promisify noArgFun fun", () => {
    const noArgFun = (callback: CallBack<number>) => {
        callback(null, 3)
    }

    test("promisify with no args function", async () => {
        const asyncFun = promisify(noArgFun)
        const result = await asyncFun()
        expect(3).toBe(result);
    });

});


describe("promisify method", () => {

    class Adder {
        a: number = 1
        b: number = 2

        getSum(callback: CallBack<number>) {
            const sum = this.a + this.b
            callback(null, sum)
        }

        add(a: number, b: number, callback: CallBack<number>) {
            const sum = a + b
            callback(null, sum)
        }
    }

    test("promisify with noArgs method", async () => {
        const adder = new Adder();
        const asyncAdd = promisify(adder.getSum.bind(adder))
        const result = await asyncAdd()
        expect(3).toBe(result);
    });

    test("promisify with args methods", async () => {
        const adder = new Adder();
        const asyncAdd = promisify(adder.add.bind(adder))
        const result = await asyncAdd(1, 2)
        expect(3).toBe(result);
    });
});
test("promiseCatch", async () => {
    async function test() {
        throw new Error("test")
    }

    const [error, result] = await promiseCatch(test())
    expect(result).toBeUndefined();
    expect(error).toBeDefined()
});

test("promisifyCallBack", async () => {
    function add(a: number, b: number, cb: { onError: (error: Error) => void, OnResult: (data: number) => void }) {
        setTimeout(() => {
            cb.OnResult(a + b)
        }, 2000)
    }

    const asyncAdd = promisifyCallBack<typeof add, number, Error>(add, (resolve, reject) => ({
        onError(err: Error) {
            reject(err)
        },
        OnResult(data: number) {
            resolve(data)
        }
    }))
    const result = await asyncAdd(1, 2);
    expect(3).toBe(result);
});

test("getMethods", async () => {
    function creatRouterApi<T>(t: new (...args: any[]) => UserApi) {
        const api = new t();
        console.log(1)
    }

    const methods = getMethods(UserApi);
    expect(methods).toBe(methods);
});


test("AsyncLock", async () => {
    // 使用示例
    async function example() {
        const lock = new AsyncLock();

        async function task(id: number) {
            // 获取锁
            await lock.acquire();
            try {
                console.log(`Task ${id} has acquired the lock.`);
                // 模拟异步操作
                await new Promise((resolve) => setTimeout(resolve, 1000));
                console.log(`Task ${id} is releasing the lock.`);
            } finally {
                // 释放锁
                lock.release();
            }
        }

        // 启动多个异步任务
        const tasks = [task(1), task(2), task(3)];
        await Promise.all(tasks);
        console.log('All tasks are done.');
    }

    await example();
});