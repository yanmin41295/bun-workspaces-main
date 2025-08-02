import {logger} from "@mono/common/src/log.js";
import {UserVo} from "@mono/common/src/api/model/User.js";
import UserApi from "@mono/common/src/api/controller/UserApi.js";

export default class UserController extends UserApi {
    async findByUserId(userInfo: { userId: string }): Promise<UserVo> {
        logger.info('ApiHandler findByUserId', 'findUser')
        return new UserVo()
    }
}
