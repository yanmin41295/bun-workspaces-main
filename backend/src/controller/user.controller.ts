import {User, UserApi} from "@mono/common/src/api/UserApi.ts";

export class UserController extends UserApi {

    async findByUserId(userInfo: { userId: string }): Promise<User> {
        return {id: 1, username: 'user0', age: 18};
    }
}

export const userController: UserApi = new UserController()
