import {UserApi} from "@mono/common/src/api/UserApi.ts";
import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:./database/db.sqlite',
        },
    },
})

export class UserController extends UserApi {
    async findByUserId(userInfo: { userId: string }): Promise<User> {
        let user = await prisma.user.findUnique({
            where: {id: Number(userInfo.userId)},
        })
        return user!
    }
}

export const userController: UserApi = new UserController()
