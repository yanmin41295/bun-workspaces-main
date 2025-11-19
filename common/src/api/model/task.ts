export class Task {
    id: number = Date.now()
    name: string = ''
    description: string = ''
    status: string = ''
    seqNum: number = 0
    progress: number = 0
    startTime: number = Date.now()
    endTime: number = Date.now()
    context: string = ''
}

