import ProgramEnv from "../env.loader.js";
import {ChildProcess, spawn} from 'child_process';
import {Log} from "@mono/common/src/prisma/models/index.js";
import readline from 'readline';
import {WsSender} from "./ws.handler.js";
import {WebSocket} from "@fastify/websocket";
import {WsMsgData} from "@mono/common/src/types.js";

const gitBashPath = ProgramEnv.gitBash

export class LogHandler {

    childProcess?: ChildProcess;

    startSaveLog(logInfo: WsMsgData<Log>, wsSender: WsSender, webSocket: WebSocket) {
        // todo 保存日志
        const child = spawn(gitBashPath, ['-c', 'tail -f app.log'], {cwd: "D:\\codespace\\bun-workspaces-main\\logs"});
        this.childProcess = child;
        child.stdout.on('data', (data) => {
        });
        if (this.childProcess.stdout) {
            const rl = readline.createInterface({
                input: this.childProcess.stdout,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                wsSender.send({...logInfo, msgType: 'partial', payload: line})
            })
            child.on('close', (code) => {
            })
        }
        if (this.childProcess.stderr) {
            this.childProcess.stderr.on('data', (data) => {
                wsSender.send({...logInfo, msgType: 'partial', payload: data.toString()})
            })
        }

        webSocket.on('close', () => {
            this.childProcess?.kill();
            this.childProcess = undefined;
        })
    }

    updateSaveLog(logInfo: Log, wsSender: WsSender, webSocket: WebSocket) {

    }

    stopSaveLog(logInfo: WsMsgData<Log>, wsSender: WsSender, webSocket: WebSocket) {
        // todo 保存日志
        if (this.childProcess) {
            this.childProcess.kill();
            this.childProcess = undefined;
        }
        wsSender.send({...logInfo, msgType: 'finish', payload: undefined})
    }
}

export const logHandler = new LogHandler()