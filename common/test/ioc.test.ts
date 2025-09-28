import {test} from "vitest";
import {Container} from "../src/api/container.js";

test('ioc ', async () => {
    const controllerLoader = new Container()
    await controllerLoader.load('./src/api/controller');
    await controllerLoader.callLambda('user-findUser', {userId: 1})
})