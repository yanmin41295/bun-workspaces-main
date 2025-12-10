import {BaseController} from "../../spi/common.ts";
import {ApiHandler, Controller} from "../../spi/annotation.ts";
import {UserVo} from "../model/User.ts";

@Controller('user')
export default class UserApi extends BaseController {
    @ApiHandler('findUser')
    findByUserId(userInfo: { userId: number }): Promise<UserVo> {
        throw new Error('findByUserId not implemented')
    }
}