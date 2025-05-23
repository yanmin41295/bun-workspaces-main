import {ApiHandler, Controller} from "../annotation.js";
import {UserVo} from "../model/User.js";
import {BaseController} from "../common.js";

@Controller('user')
export default class UserApi extends BaseController {
    @ApiHandler('findUser')
    findByUserId(userInfo: { userId: string }): Promise<UserVo> {
        return {} as Promise<UserVo>
    }
}