import {test} from "vitest";
import {Container} from "@mono/common/src/api/container.js";
import UserApi from "packages/common/src/api/controller/UserApi.js";

test('ioc ', async () => {
    const container = new Container()
    const [instance, methodName] = container.getHandler<UserApi>('user.findUser')
    const result = await instance[methodName]('1')
    console.info(result)
})