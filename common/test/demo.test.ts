import {expect, test} from 'vitest'
import {sum} from "../src/demo.ts"
import {User} from "@prisma/client";

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('prisma model', () => {
    let user: User = {
        id: 1,
        username: "test",
        email: "test@example.com",
    }
    expect(user).toBeDefined()
})