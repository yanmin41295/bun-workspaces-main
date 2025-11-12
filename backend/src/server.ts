import Fastify, {FastifyReply} from 'fastify'
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import * as path from "node:path";
import {createLogHandler, registerLogRequestContext,} from "./log.js";
import UserRouter from "./routes/user.router.js"
import TestRouter from "./routes/test.router.js"
import FileRouter from "./routes/file.router.js";

export const server = await Fastify({
    requestIdHeader: false,
    genReqId: function (req) {
        return undefined as unknown as string // 去除默认的 reqId，不生成
    },
    logger: createLogHandler()
})
export const LOGGER = await registerLogRequestContext(server)

// 注册 multipart 支持
await server.register(fastifyMultipart);
await server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    index: ['index.html', 'index.htm'],
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
// todo 包扫描注入
server.register(UserRouter.router, {prefix: UserRouter.prefix})
server.register(FileRouter.router, {prefix: FileRouter.prefix})
server.register(TestRouter.router, {prefix: TestRouter.prefix})
