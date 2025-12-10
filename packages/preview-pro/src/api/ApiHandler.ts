import axios from "axios";
import UserApi from "../../../common/src/api/controller/UserApi.ts";
import {BaseController, Constructor} from "@mono/common/src/spi/common";
import {controllerKey, requestMappingKey} from "@mono/common/src/spi/annotation";

const service = axios.create({
    baseURL: import.meta.env.PROD ? '' : "/api"
})


export class ApiClientProxy {
    creteApiClient<T extends BaseController>(api: Constructor<T>): T {
        let apiInstance = new api()
        const controller = Reflect.getMetadata(controllerKey, api)
        return new Proxy(apiInstance, {
            get(target: T, prop: string | symbol, receiver: any): any {
                // 获取原始属性
                const original = target[prop];
                // 如果是构造函数或非函数属性，直接返回
                if (prop === 'constructor' || typeof original !== 'function') {
                    return original;
                }
                const method = Reflect.getMetadata(requestMappingKey, target, prop)
                console.log('ApiClientProxy', controller, method)
                // 为方法创建代理
                return async (...args: any) => {
                    // 在 map 中查找对应的方法映射
                    return await service.request({
                        method: 'post',
                        url: `/${controller}/${method}`,
                        data: args,
                    });
                };
            }
        })
    }
}

export const apiClient = new ApiClientProxy()
export const userApi = apiClient.creteApiClient(UserApi)


