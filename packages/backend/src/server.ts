import Fastify from 'fastify'
import websocket from '@fastify/websocket'
import fastifyStatic from '@fastify/static';
import * as path from "node:path";
import {createLogHandler, getRequestId, registerLogRequestContext,} from "./log.js";
import {Container} from "@mono/common/src/api/container.js";
import {RouterHandler} from "./RouterHandler.js";
import {glob} from "glob";
import {controllerKey} from "@mono/common/src/api/annotation.js";
import {BaseController, Constructor} from "@mono/common/src/api/common.js";

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

export const container = new Container()
await registerRouter(path.join(process.cwd(), './src/controller'))

// 扫描并注册类
async function registerRouter(packagePath: string) {
    try {
        const files = await glob(`${packagePath}/**/*.{ts,js}`)
        for (const file of files) {
            const importPath = "./" + path.relative(__dirname, file.split('.').slice(0, -1).join('.'))
            const module = await import(importPath)
            for (const exported of Object.values(module)) {
                const controller = exported as Constructor<BaseController>
                if (typeof exported === 'function' && Reflect.getMetadata(controllerKey, controller)) {
                    const {
                        controllerPath,
                        apiMethods
                    } = container.scanAnnotation(exported as Constructor<BaseController>)
                    for (const apiMethod of apiMethods) {
                        LOGGER.info(`register ${exported.prototype.constructor.name}  ${apiMethod.propertyName} /${controllerPath}/${apiMethod.routePath}`,)
                        server.post(`/${controllerPath}/${apiMethod.routePath}`, async (request, reply) => {
                            try {
                                // @ts-ignore
                                const result = await new controller()[apiMethod.propertyName](...request.body)
                                return {
                                    code: 0,
                                    message: 'success',
                                    data: result
                                }
                            } catch (error) {
                                return {
                                    code: -1,
                                    // @ts-ignore
                                    message: error.message,
                                }
                            }
                        })
                    }
                }
            }
        }
    } catch (err) {
        console.error("error " + err)
    }

}


