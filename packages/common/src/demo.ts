export function sum(a: number, b: number) {
    return a + b
}

import {PrismaClient, User} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here
}

main()
    .then(async () => {
        let users: User | null = await prisma.user.findFirst()
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })