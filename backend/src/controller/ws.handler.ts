import {WebSocket} from "@fastify/websocket";
import {WsMsgData} from "@mono/common/src/types.ts";
import {execa} from "execa";

export class WsHandler {
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    handle(data: WsMsgData) {
        // todo 统一处理ws入口
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