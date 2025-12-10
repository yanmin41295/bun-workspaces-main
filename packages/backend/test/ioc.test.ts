import {expect, test} from "vitest";
import {Container} from "../src/container";

test('ioc', async () => {
    const controllerLoader = new Container()
    await controllerLoader.load('./src/controller');
    const user = await controllerLoader.callLambda('user-findUser', {userId: 1})
    expect(user).toEqual({id: 1, username: 'user', email: 'user@email.com'})
})
