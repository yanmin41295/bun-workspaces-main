import {randomUUID} from "node:crypto"

export class Task<T = any> {
    id: number = Date.now()
    clientId: string = ''
    name: string = ''
    description: string = ''
    status: 'init' | 'running' | 'success' | 'finish' | 'failed' = 'init'
    seqNum: number = 0
    progress: number = 0
    startTime: number = Date.now()
    endTime: number = Date.now()
    data: T = undefined as T

    constructor(task?: Partial<Task>) {
        if (task) {
            Object.assign(this, task)
        }
    }
}

