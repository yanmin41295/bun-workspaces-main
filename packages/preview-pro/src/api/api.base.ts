import axios from "axios";
import {FileApi} from "@mono/common/src/api/model/File";
import {isClassMethod} from "@mono/common/src/util";
import {Task} from "@mono/common/src/api/model/task";
import {v4 as uuidv4} from 'uuid'

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
    clientId = uuidv4()
    websocket!: WebSocket
    taskMap = new Map<number, (task: Task) => void>()
    reconnectAttempts = 0
    maxReconnectAttempts = 5
    reconnectInterval = 3000
    reconnectTimer: number | null = null
    isConnected = false

    constructor() {
        this.initWebSocket()
    }

    initWebSocket() {
        // 清除之前的重连定时器
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = null
        }

        // 创建新的WebSocket连接
        this.websocket = new WebSocket(`ws://localhost:3000/ws/${this.clientId}`)
        
        this.websocket.onopen = () => {
            console.log('websocket open')
            this.isConnected = true
            this.reconnectAttempts = 0
        }
        
        this.websocket.onclose = () => {
            console.log('websocket close')
            this.isConnected = false
            
            // 如果不是主动断开连接，尝试重连
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++
                console.log(`Reconnecting... (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
                this.reconnectTimer = window.setTimeout(() => {
                    this.initWebSocket()
                }, this.reconnectInterval)
            } else {
                console.log('Max reconnection attempts reached.')
            }
        }
        
        this.websocket.onerror = (error) => {
            console.log('websocket error', error)
            // 发生错误时关闭连接，触发重连机制
            this.websocket.close()
        }
        
        this.websocket.onmessage = (message) => {
            const task = JSON.parse(message.data) as Task
            const callback = this.taskMap.get(task.id)
            if (callback) {
                callback(task)
            }
            if (task.status === 'success' || task.status === 'failed') {
                this.taskMap.delete(task.id)
            }
        }
    }

    startTask(task: Task, callback: (task: Task) => void) {
        task.clientId = this.clientId
        if (this.taskMap.has(task.id)) {
            return
        }
        this.taskMap.set(task.id, callback)
        if (this.isConnected) {
            this.websocket.send(JSON.stringify(task))
        } else {
            console.warn('WebSocket is not connected. Task will be sent when connection is re-established.')
            // 可以选择将任务排队，等连接恢复后再发送
        }
    }
    
    // 手动断开连接
    disconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = null
        }
        this.reconnectAttempts = 0
        this.websocket.close()
    }
    
    // 手动重连
    reconnect() {
        this.disconnect()
        this.initWebSocket()
    }
}


export const taskSocket = new TaskSocket()

