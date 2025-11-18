import axios from "axios";
import {FileApi} from "@mono/common/src/api/model/File";
import {isClassMethod} from "@mono/common/src/util";


const service = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

service.interceptors.response.use(
    (response) => {
        return response.data.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export function createApiClient<T>(router: T & { $prefix?: string }): T {
    return new Proxy(router, {
        get(target: T & { $prefix?: string }, p: string | symbol, receiver: any): any {
            if (p !== '$prefix' && isClassMethod(target, p)) {
                return (body: any) => {
                    return service.request({
                        url: `${target.$prefix ?? ''}/${String(p)}`,
                        method: 'post',
                        data: body
                    })
                }
            } else {
                return Reflect.get(target, p)
            }
        }
    })
}


export const fileApiClient = createApiClient(new FileApi())

