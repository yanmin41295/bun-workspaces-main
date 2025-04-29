import Fastify from 'fastify'
import websocket from '@fastify/websocket'
import fastifyStatic from '@fastify/static';
import * as path from "node:path";
import {createLogHandler, getRequestId, registerLogRequestContext,} from "./log.js";
import {Container} from "@mono/common/src/api/container.js";
import {RouterHandler} from "./RouterHandler.js";

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
export const container = new Container()
await container.scanPackage('./src/api/controller')
server.get('/websocket', {websocket: true}, function wsHandler(socket, req) {
    // bound to fastify server
    socket.on('open', () => {
        LOGGER.info('websocket open')
        socket.send('hi from server')
    })
    LOGGER.info('websocket connected')
    new RouterHandler(socket).dispatch()
})

server.get('/hello', (request, reply) => {
    LOGGER.info('hello world request %s', getRequestId());
    return {
        hello: "world",
        date: new Date().toLocaleString()
    }
})




