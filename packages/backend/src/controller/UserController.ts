import UserController from "@mono/common/src/api/controller/UserController.js";
import {logger} from "@mono/common/src/log.js";
import {UserVo} from "@mono/common/src/api/model/User.js";


export default class UserRouterController extends UserController {
    async findUserHandler(name: string): Promise<UserVo> {
        logger.info('ApiHandler findUserHandler', 'findUser')
        return new UserVo()
    }
}
