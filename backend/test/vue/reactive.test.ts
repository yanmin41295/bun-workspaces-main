import {describe, expect, it} from "vitest";
import {reactive, effect} from "../../src/vue/index.js";

describe('vue reactive', async () => {
    const state = reactive({
        message: 'Hello Vue 3!',
        count: 0,
        user: {
            name: 'Tom',
            age: 25
        },
        orders: [
            {
                id: 1,
                name: 'Order 1',
                price: 10
            }, {
                id: 2,
                name: 'Order 2',
                price: 20
            }
        ]
    });

    it('state.count', async () => {
        let result = 0
        // 浅层对象属性
        effect(() => result = state.count);
        state.count = 3;
        expect(result).toBe(3);
    });

    it('state.user.age', async () => {
        let result = 0
        // 嵌套对象属性
        effect(() => result = state.user.age);
        state.user.age = 30
        expect(result).toBe(30);
    });

    it('state.orders', async () => {
        // 数组重新赋值
        let result: { id: number, name: string, price: number }[] = []
        // 嵌套对象属性
        effect(() => result = state.orders);
        state.orders = [{id: 3, name: 'Order 3', price: 30}]
        expect(result).toEqual([{id: 3, name: 'Order 3', price: 30}]);
    });
    it('state.orders[0]', async () => {
        // 数组索引重新赋值
        let result: { id: number, name: string, price: number } = state.orders[0]
        // 嵌套对象属性
        effect(() => result = state.orders[0]);
        state.orders[0] = {id: 3, name: 'Order 3', price: 30}
        expect(result).toEqual({id: 3, name: 'Order 3', price: 30});
    });
    it('state.orders[0].price', async () => {
        // 数组索引重新赋值嵌套对象属性
        let result = 0
        // 嵌套对象属性
        effect(() => result = state.orders[0].price);
        expect(result).toBe(10);
        state.orders[0].price = 100
        expect(result).toBe(100);
    });
    it('state.orders.push', async () => {
        // 数组索引重新赋值嵌套对象属性
        let result = 0
        // 嵌套对象属性
        effect(() => result ++);
        expect(result).toBe(1);
        state.orders.push({id: 3, name: 'Order 3', price: 30})
        expect(result).toBe(2);
    });
});