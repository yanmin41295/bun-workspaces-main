import {FastifyInstance} from "fastify";
import fastifyWebsocket, {WebSocket} from "@fastify/websocket";
import {Task} from "@mono/common/src/api/model/task.js";

export class SocketRouter {

    lambdaMap = new Map<string, (websocket: WebSocket, task: Task) => void>([
        ['ping', pingHandler]
    ]);
    connection: WebSocket | null = null;
    server: FastifyInstance

    constructor(server: FastifyInstance) {
        this.server = server

    }

    async init() {
        await this.server.register(fastifyWebsocket);
        this.server.get('/ws', {websocket: true}, (connection: WebSocket, req) => {
            // 监听客户端发送的消息
            connection.onmessage = (message) => {
                console.log('received:', message.data);
            };
            connection.onopen = () => {
                console.log('client connected');
            };
            this.connection = connection;
        });

        this.server.post('/task', async (req, res) => {
            const task = req.body as Task
            this.startTask(task)
            return {code: 0, data: task}
        })
    }

    startTask(task: Task) {
        const lambda = this.lambdaMap.get(task.name)
        if (lambda && this.connection) {
            lambda(this.connection, task)
        }
    }
}


async function pingHandler(websocket: WebSocket, task: Task) {
    while (task.seqNum <= 100) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        task.seqNum++
        task.progress = task.seqNum
        websocket.send(JSON.stringify(task))
    }
}