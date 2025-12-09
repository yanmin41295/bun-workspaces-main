import {expectTypeOf, test} from "vitest";
import {If} from "../index.ts";

test("If type works correctly", () => {
    // 测试当条件为 true 时返回第一个类型
    type Case1 = If<true, string, number>;
    expectTypeOf<Case1>().toEqualTypeOf<string>();

    // 测试当条件为 false 时返回第二个类型
    type Case2 = If<false, string, number>;
    expectTypeOf<Case2>().toEqualTypeOf<number>();

    // 测试复杂类型
    type Case3 = If<true, {a: string}, {b: number}>;
    expectTypeOf<Case3>().toEqualTypeOf<{a: string}>();

    type Case4 = If<false, {a: string}, {b: number}>;
    expectTypeOf<Case4>().toEqualTypeOf<{b: number}>();
});