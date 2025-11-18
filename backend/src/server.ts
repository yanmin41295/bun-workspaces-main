import Fastify, {FastifyInstance, FastifyRequest} from 'fastify'
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import fastifyWebsocket, {WebSocket} from '@fastify/websocket';
import * as path from "node:path";
import {createLogHandler, registerLogRequestContext,} from "./log.js";
import UserRouter from "./routes/user.router.js"
import TestRouter from "./routes/test.router.js"
import {fileRouter} from "./routes/file.router.js";
import {RouterApi, SchemeParam} from "@mono/common/types.js";
import {forEachMethod, getInstanceOwnMethods, getOwnMethods} from "@mono/common/src/util.js";

export const server = await Fastify({
    requestIdHeader: false,
    genReqId: function (req) {
        return undefined as unknown as string // 去除默认的 reqId，不生成
    },
    logger: createLogHandler()
})
export const LOGGER = await registerLogRequestContext(server)

// 注册 multipart 支持
await server.register(fastifyMultipart, {
    limits: {
        // 设置为您需要的最大文件大小（以字节为单位）
        fileSize: 1048576000, // 100MB
        files: 10, // 最多同时上传10个文件
        fields: 10, // 最多10个字段
    }
});
await server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    index: ['index.html', 'index.htm'],
});
// 注册 WebSocket 支持
await server.register(fastifyWebsocket);
server.get('/ws', {websocket: true}, (connection: WebSocket, req) => {
    // 监听客户端发送的消息
    connection.onmessage = (message) => {
        // 处理客户端发送的消息
        console.log('Received message:', String(message.data), message.type);
        // 发送消息给客户端
        connection.send(message.data);
    };

});
// 全局异常处理器
server.setErrorHandler(function (error, request, reply) {
    // 记录错误日志
    LOGGER.error('Unhandled error:', error);
    // 检查错误类型并返回相应的响应
    if (error.statusCode) {
        // 如果错误有状态码，使用该状态码
        reply.status(error.statusCode).send({
            code: -1,
            message: error.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && {stack: error.stack})
        });
    } else {
        // 默认返回500错误
        reply.status(500).send({
            code: -1,
            message: error.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && {stack: error.stack})
        });
    }
});


createRouter(server, fileRouter)
server.register(UserRouter.router, {prefix: UserRouter.prefix})
server.register(TestRouter.router, {prefix: TestRouter.prefix})


export function createRouter<T extends object>(server: FastifyInstance, routerInstance: T & { $prefix?: string }) {
    getInstanceOwnMethods(routerInstance)
    forEachMethod(routerInstance, (methodName, method) => {
        LOGGER.info(`Registering ${routerInstance.$prefix ?? ''}/${methodName}`)
        if (methodName==='constructor') {
            return
        }
        server.post(`${routerInstance.$prefix ?? ''}/${methodName}`, async (req, res) => {
            let result: any
            try {
                LOGGER.info(`Calling ${routerInstance.$prefix ?? ''}/${methodName} ${JSON.stringify(req.body)}`)
                result = await routerInstance[methodName](req, res)
                return {code: 0, data: result}
            } catch (e) {
                return {code: -1, message: e instanceof Error ? e.message : String(e)}
            }
        })
    })
}


