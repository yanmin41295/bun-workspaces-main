import {UserVo} from "@mono/common/src/api/model/User.ts";
import UserApi from "@mono/common/src/api/controller/UserApi.ts";

export default class UserController extends UserApi {
    async findByUserId(userInfo: { userId: number }): Promise<UserVo> {
        return {id: userInfo.userId, username: 'user', email: 'user@email.com'}
    }
}
