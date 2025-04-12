// vue.test.ts
import {describe, expect, test} from "vitest";

class Dep {
    private subs: Set<Watcher> = new Set();

    static target: Watcher | null = null;

    depend() {
        if (Dep.target) {
            this.subs.add(Dep.target);
        }
    }

    notify() {
        this.subs.forEach(sub => sub.update());
    }
}

class Watcher {
    private value: any;

    constructor(private getter: () => any, private callback: (newValue: any, oldValue: any) => void) {
        Dep.target = this;
        this.get();
        Dep.target = null;
    }

    get() {
        this.value = this.getter();
    }

    update() {
        const oldValue = this.value;
        this.get();
        this.callback(this.value, oldValue);
    }
}

function effect(getter: () => any, callback: (newValue: any, oldValue: any) => void) {
    new Watcher(getter, callback);
}

type Target = Record<string, any>;

const reactiveMap = new WeakMap<Target, any>();
const targetMap = new WeakMap<Target, Map<string | symbol, Dep>>();

function getDep(target: Target, key: string | symbol): Dep {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Dep();
        depsMap.set(key, dep);
    }
    return dep;
}

function createReactiveObject<T extends object>(target: T): T {
    if (reactiveMap.has(target)) {
        return reactiveMap.get(target);
    }

    const handler: ProxyHandler<T> = {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            const dep = getDep(target, key);
            dep.depend();
            if (typeof result === 'object' && result !== null) {
                return createReactiveObject(result);
            }
            return result;
        },
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            const dep = getDep(target, key);
            dep.notify();
            return result;
        },
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key);
            const dep = getDep(target, key);
            dep.notify();
            return result;
        }
    };

    const proxy = new Proxy(target, handler);
    reactiveMap.set(target, proxy);
    return proxy;
}

export function reactive<T extends Target>(target: T): T {
    if (typeof target !== 'object' || target === null) {
        console.warn(`target ${target} is not a valid object`);
        return target;
    }
    return createReactiveObject(target) as T;
}

// 示例使用

describe('watch ', () => {
    test('watch single value', () => {
        const data = reactive({
            value: 1,
        });
        const watchValue = {
            oldValue: 0,
            newValue: 0,
        }
        effect(() => data.value,
            (newValue: number, oldValue: number) => {
                console.log(` changed from ${oldValue} to ${newValue}`);
                watchValue.newValue = newValue
                watchValue.oldValue = oldValue
            }
        );
        data.value = 2
        expect(watchValue).toEqual({
            oldValue: 1,
            newValue: 2,
        })
    })

    test('watch two value', () => {
        const data = reactive({
            a: 1,
            b: 2
        });
        const watchValue = {
            oldValue: 0,
            newValue: 0,
        }
        effect(() => data.a + data.b,
            (newValue: number, oldValue: number) => {
                console.log(` changed from ${oldValue} to ${newValue}`);
                watchValue.newValue = newValue
                watchValue.oldValue = oldValue
            }
        );
        data.a = 2
        expect(watchValue).toEqual({
            oldValue: 3,
            newValue: 4,
        })
        data.b = 3
        expect(watchValue).toEqual({
            oldValue: 4,
            newValue: 5,
        })
    })
})



