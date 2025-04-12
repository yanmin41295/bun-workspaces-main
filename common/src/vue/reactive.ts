class State<T> {
    $state: T
    private watchers = []

    constructor(init: T) {
        this.$state = init
    }
}


export function ref<T>(init: T) {
    return createReactiveObject(new State(init))
}

export function computed(){

}

// reactive.ts

type Target = Record<string, any>;

const reactiveMap = new WeakMap<Target, any>();

function createReactiveObject<T extends object>(target: T): T {
    if (reactiveMap.has(target)) {
        return reactiveMap.get(target);
    }

    const handler: ProxyHandler<T> = {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            if (typeof result === 'object' && result !== null) {
                return createReactiveObject(result);
            }
            return result;
        },
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            // 触发更新逻辑（这里简化处理）
            console.log(`Set ${String(key)} to ${value}`);
            return result;
        },
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key);
            // 触发更新逻辑（这里简化处理）
            console.log(`Deleted ${String(key)}`);
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
const originalObject = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    }
};

const reactiveObject = reactive(originalObject);

console.log(reactiveObject.b.d.e); // 输出: 3
reactiveObject.b.d.e = 4; // 输出: Set e to 4
