import Fastify from 'fastify'
import {userController} from "./controller/user.controller.ts";
import {Api} from "@mono/common";
import websocket from '@fastify/websocket'
import fastifyStatic from '@fastify/static';
import * as path from "node:path";
import {WsMsgData} from "@mono/common/src/types.js";
import {WsHandler} from "./controller/ws.handler.js";
import {createLogHandler, getRequestId, registerLogRequestContext,} from "./log.js";

export const server = await Fastify({
    requestIdHeader: false,
    genReqId: function (req) {
        return undefined as unknown as string // 去除默认的 reqId，不生成
    },
    logger: createLogHandler()
})
export const LOGGER = await registerLogRequestContext(server)
await server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    index: ['index.html', 'index.htm'],
});
await server.register(websocket)


server.get('/websocket', {websocket: true}, function wsHandler(socket, req) {
    // bound to fastify server
    socket.on('open', () => {
        LOGGER.info('websocket open')
    })

    socket.on('message', message => {
        // message.toString() === 'hi from client'
        socket.send('hi from server')
        // 假设客户端发送一个命令来执行
        const msg = message.toString();
        try {
            let data: WsMsgData = JSON.parse(msg);
            new WsHandler(socket).handle(data)
        } catch (e) {
            socket.send(JSON.stringify({
                header: {
                    code: 'error',
                }, payload: {
                    msg: 'invalid message'
                }
            }))
        }
    })
})


server.get('/hello', (request, reply) => {
    LOGGER.info('hello world request %s', getRequestId());
    return {
        hello: "world",
        date: new Date().toLocaleString()
    }
})

function register<T extends Api>(api: T) {
    let apiUrl = api.getApiUrl();
    apiUrl.namespace;
    for (let methodsKey in apiUrl.methods) {
        // @ts-ignore
        server.post(`${apiUrl.namespace}${apiUrl.methods[methodsKey]}`, async (request, reply) => {
            // @ts-ignore
            return await api[methodsKey](request.body)
        })
    }
}

register(userController)

