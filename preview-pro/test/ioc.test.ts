import {test} from "vitest";
import {Container} from "@mono/common/src/api/container.js";

class IocContainer extends Container {

}

test('service ioc', async () => {
    const controllerLoader = new Container()
    await controllerLoader.load('./src/api/controller', 'D:\\codespace\\bun-workspaces-main\\common');
    await controllerLoader.callLambda('user-findUser', {userId: 1})
})