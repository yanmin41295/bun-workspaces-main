import {WebSocket} from "@fastify/websocket";
import {WsMsgData} from "@mono/common/src/types.ts";
import {execa} from "execa";

export interface WsEventHandler<T, R> {
    handle(socket: WebSocket, data: T): R;
}

export class DefaultWsEventHandler<T, R> {
    handle(socket: WebSocket, data: T): R {
        return data as unknown as R;
    }
}

export const defaultWsEventHandler = new DefaultWsEventHandler();

export class WsHandler {
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    handle(data: WsMsgData) {
        let result  // todo 统一处理ws入口
        data.header.interactId++;
        switch (data.header.action) {
            case 'execAsync':
                this.execAsync(data)
                break;
            default:
                result = defaultWsEventHandler.handle(this.socket, data)
                break;
        }
        data.header.code = 'success';
        data.header.type = 'response';
        this.socket.send(JSON.stringify(result));
    }

    execAsync(wsMsg: WsMsgData<{ command: string }>) {
        const childProcess = execa(wsMsg.payload.command, [], {
            shell: true,
            stdio: ['inherit', 'pipe', 'pipe'], // 继承stdin，重定向stdout和stderr
        });

        childProcess.stdout?.on('data', (data: any) => {
            this.socket.send(data.toString());
        });

        childProcess.stderr?.on('data', (data: any) => {
            this.socket.send(data.toString());
        });

        childProcess.on('exit', (code: any) => {
            this.socket.send(`Process exited with code ${code}`);
        });

        childProcess.on('error', (error: any) => {
            this.socket.send(`Error: ${error.message}`);
        });
    }
}