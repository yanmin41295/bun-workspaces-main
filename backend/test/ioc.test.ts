import {test} from "vitest";
import {Container} from "@mono/common/src/api/container.js";

class IocContainer extends Container {

}
test('service ioc', async () => {
    const container = new IocContainer();
    await container.load('./src/controller');
    let result = await container.callLambda('user-findUser', {userId: 1})
    console.log(result)
})