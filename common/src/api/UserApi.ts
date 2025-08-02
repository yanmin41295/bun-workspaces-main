import {type Api} from "./controller.api.ts";
import {User} from "@mono/common/src/prisma/models/User.model.ts";
import {BaseWsProxy, WsProxy} from "../socket.js";


export abstract class UserApi extends BaseWsProxy<WsProxy> implements Api<UserApi> {
    getApiUrl() {
        return {
            namespace: "users",
            methods: {
                // todo 支持方法，描述等
                "findByUserId": '/userId',
            }
        }
    }

    abstract findByUserId(userInfo: { userId: string; }): Promise<User>;
}


