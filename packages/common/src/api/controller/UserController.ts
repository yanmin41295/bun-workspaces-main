import {logger} from '../../log.js'
import {Controller, RequestMapping} from "../annotation.js";
import {UserVo} from "../model/User.js";


@Controller('user')
export default class UserController {

    @RequestMapping('findUser')
    async findUserHandler(name: string): Promise<UserVo> {
        logger.info('ApiHandler findUserHandler', 'findUser')
        return undefined as any
    }
}
