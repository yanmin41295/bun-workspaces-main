import {FastifyInstance} from "fastify";
import fastifyWebsocket, {WebSocket} from "@fastify/websocket";
import {Task} from "@mono/common/src/api/model/task.js";
import {exec, spawn} from "child_process";
import {LOGGER} from "../server.ts";

const connectionMap = new Map<string, WebSocket>();

export class SocketRouter {

    lambdaMap = new Map<string, (websocket: WebSocket, task: Task) => void>([
        ['ping', pingHandler]
    ]);
    server: FastifyInstance

    constructor(server: FastifyInstance) {
        this.server = server
    }

    async init() {
        await this.server.register(fastifyWebsocket);
        this.server.get<{
            Params: { clientId: string }
        }>('/ws/:clientId', {websocket: true}, (connection: WebSocket, req) => {
            const connectionId = `${req.params.clientId}`;
            connectionMap.set(connectionId, connection);
            // 为每个连接创建一个独立的shell进程
            // 监听客户端发送的消息
            connection.onmessage = (message) => {
                // 将命令发送到shell进程
                const task = JSON.parse(message.data.toString()) as Task
                switch (task.name) {
                    case 'executeCommand':
                        executeCommand(task)
                        break
                }
            };
            connection.onopen = () => {
                LOGGER.info('onopen: ' + connectionId);
            };

            connection.onclose = () => {
                LOGGER.info('onclose: ' + connectionId);
                connectionMap.delete(connectionId);
            };
        });
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

/**
 * 执行命令
 * 配置参数：
 * 断链后是否继续执行 todo
 *
 * stream: 是否流式输出
 * command: 要执行的命令
 *
 * @param task
 */
async function executeCommand(task: Task<{ command: string }>) {
    const websocket = connectionMap.get(task.clientId)!
    // 解析命令和参数
    const [command, ...args] = task.data.command.trim().split(/\s+/);
    LOGGER.info('executeCommand: ' + task.data.command, args);
    // 直接执行命令
    const shellProcess = spawn('cmd', ['/c', command, ...args]);
    // 监听标准输出并流式发送
    shellProcess.stdout.on('data', (data: Buffer) => {
        const output = data.toString();
        const lineTask = new Task(task);
        lineTask.status = 'running';
        lineTask.data = {message: output, output: 'stdout'};
        websocket.send(JSON.stringify(lineTask));
    });

    // 监听错误输出并流式发送
    shellProcess.stderr.on('data', (data: Buffer) => {
        const output = data.toString();
        const lineTask = new Task(task);
        lineTask.status = 'running';
        lineTask.data = {message: output, output: 'stderr'};
        websocket.send(JSON.stringify(lineTask));
    });

    // 监听进程结束
    shellProcess.on('close', (code: number) => {
        const lineTask = new Task(task);
        lineTask.endTime = Date.now();
        lineTask.status = 'finish';
        lineTask.data = {message: code, output: 'close'};
        websocket.send(JSON.stringify(lineTask));
    });

    // 监听进程错误
    shellProcess.on('error', (error: Error) => {
        const lineTask = new Task(task);
        lineTask.endTime = Date.now();
        lineTask.status = 'failed';
        lineTask.data = {message: error.message, output: 'error'};
        websocket.send(JSON.stringify(resultTask));
    });
}
