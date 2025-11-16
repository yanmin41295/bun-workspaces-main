import axios from "axios";
import {ApiMethod, RouterApi, SchemeParam} from "@mono/common/types";
import {fileApiScheme} from "@mono/common/src/api/model/File";


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

export function createApiClient<T extends {
    [key: string]: SchemeParam
}>(router: T): ApiMethod<T> {
    const client = {} as ApiMethod<T>
    for (let schemaKey in router) {
        console.log(`createApiMethod ${router[schemaKey].prefix ?? ''}/${schemaKey}`)
        client[schemaKey] = async (body) => {
            let result
            try {
                console.log(`Calling ${router[schemaKey].prefix ?? ''}/${schemaKey} ${JSON.stringify(body)}`)
                result = await service.request({
                    url: `${router[schemaKey].prefix ?? ''}/${schemaKey}`,
                    method: router[schemaKey].method ?? 'post',
                    data: body
                })
                return result
            } catch (e) {
                return {code: -1, message: e instanceof Error ? e.message : String(e)}
            }
        }
    }
    return client
}

export const fileApiClient = createApiClient(fileApiScheme)

