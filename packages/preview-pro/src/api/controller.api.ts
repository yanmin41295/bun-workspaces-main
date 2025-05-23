import {BaseController, Constructor} from "@mono/common/src/api/common";
import {Container} from "@mono/common/src/api/container";
import axios from "axios";
import UserApi from "../../../common/src/api/controller/UserApi";

const service = axios.create({
    baseURL: import.meta.env.PROD ? '' : "/api"
})

export class ApiClientProxy {
    container: Container = new Container()

    creteApiClient<T extends BaseController>(api: Constructor<T>): T {
        const apiClient = new api();
        const {controllerPath, apiMethods} = this.container.scanAnnotation(api)
        apiMethods.forEach(method => {
            apiClient[method.propertyName] = async (...args: any) => {
                return await service.request({
                    method: 'post',
                    url: `/${controllerPath}/${method.routePath}`,
                    data: args,
                })
            }
        })
        return apiClient
    }
}

export const apiClient = new ApiClientProxy()
export const userApi = apiClient.creteApiClient(UserApi)


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