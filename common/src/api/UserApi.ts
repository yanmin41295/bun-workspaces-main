import {type Api} from "./controller.api.ts";

export interface User {
    id: number;
    username: string;
    email: string;
}


export abstract class UserApi implements Api<UserApi> {
    getApiUrl() {
        return {
            namespace: "/users",
            methods: {
                // todo 支持方法，描述等
                "findByUserId": '/userId',
            }
        }
    }

    abstract findByUserId(userInfo: { userId: string; }): Promise<User>;
}


