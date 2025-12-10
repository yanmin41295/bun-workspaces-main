import Fastify, {FastifyInstance} from 'fastify'
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import * as path from "node:path";
import {createLogHandler, registerLogRequestContext,} from "./log.ts";
import {SocketRouter,} from "./routes/socket.router.ts";
import {Container} from "./container.ts";

const container = new Container();
await container.load('./controller');
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
export const socketRouter = new SocketRouter(server);
// 注册 WebSocket 支持
await socketRouter.init();

// 全局异常处理器
server.setErrorHandler<any>(function (error, request, reply) {
    // 记录错误日志
    LOGGER.error('Unhandled error:', error);
    // 检查错误类型并返回相应的响应
    if (error.statusCode) {
        // 如果错误有状态码，使用该状态码
        reply.status(error?.statusCode).send({
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


function registerController(server: FastifyInstance) {
    container.lambdaMap.forEach(([lambda, instance, methodName], lambdaPath) => {
        LOGGER.info(`Registering lambda: ${lambdaPath}`)
        server.post(`/${lambdaPath.split('-').join('/')}`, async (req, res) => {
            return await lambda.call(instance, req.body)
        })
    })
}

registerController(server)


