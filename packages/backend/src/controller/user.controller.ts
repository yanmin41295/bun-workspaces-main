import {UserApi} from "@mono/common/src/api/UserApi.ts";
import {User} from "@mono/common/src/prisma/models/User.model.ts";
import {PrismaClient} from "../prisma/client.ts";
import * as path from "node:path";
import {LOGGER} from "../server.ts";
import ProgramEnv from "../env.loader.js";

const dbFile = ProgramEnv?.database?.url ?? path.join(process.cwd(), "file:./database/db.sqlite");

const prisma = new PrismaClient({
    datasourceUrl: `${dbFile}`,
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
