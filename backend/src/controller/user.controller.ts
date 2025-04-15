import {UserApi} from "@mono/common/src/api/UserApi.ts";
import {User} from "@mono/common/src/prisma/interfaces.ts";
import {PrismaClient} from "@prisma/client";
import * as path from "node:path";
import {LOGGER} from "../server.ts";

const dbFile = path.join(process.cwd(), "./database/db.sqlite");

const prisma = new PrismaClient({
    datasourceUrl: `file:${dbFile}`,
})

export class UserController extends UserApi {
    async findByUserId(userInfo: { userId: string }): Promise<User> {
        LOGGER.info(`dbFile: ${dbFile}`);
        let user = await prisma.user.findUnique({
            where: {id: Number(userInfo.userId)},
        })
        return user!
    }
}

export const userController: UserApi = new UserController()
