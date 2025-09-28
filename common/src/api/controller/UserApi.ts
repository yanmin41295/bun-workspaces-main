import {ApiHandler, Controller} from "../annotation.js";
import {UserVo} from "../model/User.js";
import {BaseController} from "../container.js";

@Controller('user')
export default class UserApi extends BaseController {

    @ApiHandler('findUser')
    findByUserId(userInfo: { userId: number }): Promise<UserVo> {
        throw new Error('findByUserId not implemented')
    }
}