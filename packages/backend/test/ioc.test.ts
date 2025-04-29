import {test} from "vitest";
import {Container} from "@mono/common/src/api/container.js";
import UserController from "@mono/common/src/api/controller/UserController.js";

test('ioc ', async () => {
    const container = new Container()
    await container.scanPackage('./src/controller')
    const [instance, methodName] = container.getHandler<UserController>('user.findUser')
    const result = await instance[methodName]('1')
    console.info(result)

    await container.initNestRouter()
    console.info(instance)
})