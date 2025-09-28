import axios from "axios";
import UserApi from "../../../common/src/api/controller/UserApi";
import {BaseController, Constructor, Container} from "@mono/common/src/api/container";

const service = axios.create({
    baseURL: import.meta.env.PROD ? '' : "/api"
})

export class ApiClientProxy {
    container: Container = new Container()

    async creteApiClient<T extends BaseController>(api: Constructor<T>): Promise<T> {
        const map: Map<string, [Function, any, string]> = await this.container.load('./src/api/controller', 'D:\\codespace\\bun-workspaces-main\\common');
        let apiInstance = new api()
        map.forEach((value, key) => {
            const [method, instance, propertyName] = value
            if (instance.prototype !== api) {
                return
            }
            // @ts-ignore
            apiInstance[propertyName] = async (...args: any) => {
                return await service.request({
                    method: 'post',
                    url: `/lambda/${key}`,
                    data: args,
                })
            }
        })
        return apiInstance as T
    }
}

export const
    apiClient = new ApiClientProxy()
export const
    userApi = apiClient.creteApiClient(UserApi)


class Task {
    id: string = ''
    name: string = ''
    status: string = ''
    createTime: Date = new Date()
    updateTime: Date = new Date()
    context: any[] = []
    data: any = {}
}

class TaskHandler {
    task: Task;

    constructor(task: Task) {
        this.task = task;
    }

    onMessage: (data: Task) => void = (data) => {
    }
    onClose: (code: number, reason: string) => void = () => {
    }
    onOpen: () => void = () => {
    }
    onError: (error: any) => void = (error) => {
    }
}


class WebsocketClient {
    websocket: WebSocket = new WebSocket('ws://localhost:3000/websocket');
    taskPool: Map<string, TaskHandler> = new Map()

    constructor() {
        this.init()
    }

    init() {
        this.websocket.onopen = (event) => {
            this.taskPool.forEach((client) => {
                client.onOpen()
            })
        }
        this.websocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            const client = this.taskPool.get(data.id)
            if (client) {
                client.onMessage(data)
            }
        }
        this.websocket.onclose = (event) => {
            this.taskPool.forEach((client) => {
                client.onClose(event.code, event.reason)
            })
        }
        this.websocket.onerror = (event) => {
            this.taskPool.forEach((client) => {
                client.onError(event)
            })
        }
    }


    registerTaskHandler(client: TaskHandler) {
        this.taskPool.set(client.task.id, client)
    }

    unregisterTaskHandler(client: TaskHandler) {
        this.taskPool.delete(client.task.id)
    }

}