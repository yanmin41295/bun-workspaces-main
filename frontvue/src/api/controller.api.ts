import {UserApi} from "@mono/common/src/api/UserApi";
import axios from "axios";
import type {Api} from "@mono/common";
console.log(import.meta.env.BASE_URL);
const service = axios.create({
    baseURL: import.meta.env.PROD ?  '':"/api"
})

export function creatRouterApi<T extends abstract new (...args: any) => Api>(t: T): InstanceType<T> {
    // @ts-ignore
    const api = new t() as InstanceType<T>;
    let apiUrl = api.getApiUrl();
    for (let methodsKey in apiUrl.methods) {
        // @ts-ignore
        api[methodsKey] = async (arg: any) => {
            return await service.request({
                method: 'POST',
                // @ts-ignore
                url: `${apiUrl.namespace}${apiUrl.methods[methodsKey]}`,
                data: arg
            })
        }
    }
    return api;
}

export const userApi = creatRouterApi(UserApi)

