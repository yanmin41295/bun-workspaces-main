import * as console from "node:console";
import {describe, test} from "vitest";
import {z} from "zod";

describe("demo", () => {
    test("demo", async () => {
        let UserSchema = z.object({
            id: z.number(), // 必选属性：number
            name: z.string(), // 必选属性：string
            age: z.number().optional(), // 可选属性：number | undefined
            isActive: z.boolean().default(true), // 带默认值的属性（自动变为可选）
        });
        console.log(UserSchema);
    })
});
