import {describe, it} from "vitest";
import {userSchema} from "../src/database/drizzle/schema/user.schema.js";

describe('add function', async () => {
    it('should return the sum of two numbers', async () => {
        let data = await userSchema.findUsers()
        console.log(data)
    });
});