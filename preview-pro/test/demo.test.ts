import {expect, test} from 'vitest'
import {User} from "@prisma/client";


test('prisma model', () => {
    let user: User = {
        id: 1,
        username: "test",
        email: "test@example.com",
    }
    expect(user).toBeDefined()
})