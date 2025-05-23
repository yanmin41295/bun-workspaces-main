import {test} from "vitest";
import {Container} from "../src/api/container.js";
import UserApi from "../src/api/controller/UserApi.js";

test('ioc ', async () => {
    const container = new Container()
    await container.scanPackage('./src/api/controller')
    const [instance, methodName] = container.getHandler<UserApi>('user.findUser')
    const result = await instance[methodName]('1')
    console.info(result)
})