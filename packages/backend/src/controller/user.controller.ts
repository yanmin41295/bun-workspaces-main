import {UserApi} from "@mono/common/src/api/UserApi.ts";
import {User} from "@mono/common/src/prisma/models/User.model.ts";
import {prisma} from "../app.js";


export class UserController extends UserApi {
    async findByUserId(userInfo: { userId: string }): Promise<User> {
        let user = await prisma.user.findUnique({
            where: {id: Number(userInfo.userId)},
        })
        return user!
    }
}

export const userController: UserApi = new UserController()
