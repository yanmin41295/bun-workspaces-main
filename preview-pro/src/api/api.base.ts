import axios from "axios";
import {FileApi} from "@mono/common/src/api/model/File";
import {isClassMethod} from "@mono/common/src/util";
import {Task} from "@mono/common/src/api/model/task";


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


export class TaskSocket {

    websocket = new WebSocket('ws://localhost:3000/ws')
    taskMap = new Map<number, (task: Task) => void>()

    constructor() {
        this.websocket.onopen = () => {
            console.log('websocket open')
        }
        this.websocket.onclose = () => {
            console.log('websocket close')
        }
        this.websocket.onerror = (error) => {
            console.log('websocket error', error)
        }
        this.websocket.onmessage = (message) => {
            console.log('websocket message', message.data)
            const task = JSON.parse(message.data) as Task
            const callback = this.taskMap.get(task.id)
            if (callback) {
                callback(task)
            }
        }
    }

    onTask(task: Task, callback: (task: Task) => void) {
        this.taskMap.set(task.id, callback)
    }

    endTask(task: Task) {
        this.taskMap.delete(task.id)
    }


}


export const taskSocket = new TaskSocket()

