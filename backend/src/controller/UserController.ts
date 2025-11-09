import {UserVo} from "@mono/common/src/api/model/User.js";
import UserApi from "@mono/common/src/api/controller/UserApi.js";
import {KnexClient} from "../db/knex.js";

export default class UserController extends UserApi {
    async findByUserId(userInfo: { userId: number }): Promise<UserVo> {
        const user = await KnexClient.select('*')
            .from<UserVo>('t_user').where({id: userInfo.userId});
        return user[0]
    }
}
