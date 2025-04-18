import {WebSocket} from "@fastify/websocket";
import {WsMsgData} from "@mono/common/src/types.ts";
import {execa} from "execa";
import {logHandler} from "./log.handler.js";
import {v4 as uuidv4} from 'uuid';
import {format} from 'date-fns';


export interface WsHandlerMap {
    [key: string]: (wsSender: WsSender, webSocket: WebSocket, data: WsMsgData) => void;
}

export interface WsSender {
    send: (wsMsgData: WsMsgData) => void
}

export class WsHandler implements WsSender {
    socket: WebSocket;
    handlerMap: WsHandlerMap = {
        'log.startSaveLog': (wsSender: WsSender, webSocket: WebSocket, data: WsMsgData) => logHandler.startSaveLog(data, wsSender, webSocket),
        'log.stopSaveLog': (wsSender: WsSender, webSocket: WebSocket, data: WsMsgData) => logHandler.stopSaveLog(data, wsSender, webSocket),
        'log.updateSaveLog': (wsSender: WsSender, webSocket: WebSocket, data: WsMsgData) => logHandler.updateSaveLog(data, wsSender, webSocket),
    }

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    handle(data: WsMsgData) {
        data.interactId++;
        let handler = this.handlerMap[data.action]
        if (handler) {
            handler(this, this.socket, data);
            this.send({...data, msgType: 'confirm', payload: undefined});
        } else {
            data.msgType = 'error';
            this.send({...data, msgType: 'error', payload: 'invalid action'});
        }
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

    send(wsMsgData: WsMsgData): void {
        wsMsgData.interactId++;
        wsMsgData.messageId = uuidv4();
        wsMsgData.timeStr = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
        wsMsgData.action = wsMsgData.action + ".response";
        this.socket.send(JSON.stringify(wsMsgData));
    }
}