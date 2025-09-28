import Fastify, {FastifyRequest} from 'fastify'
import fastifyStatic from '@fastify/static';
import * as path from "node:path";
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

server.get('/hello', (request, reply) => {
    LOGGER.info('hello world request %s', getRequestId());
    return {
        hello: "world",
        date: new Date().toLocaleString()
    }
})
server.post(`/lambda/:lambda`, async (request: FastifyRequest<{ Params: { lambda: string; } }>, reply) => {
    try {
        let lambdaName = request.params.lambda
        // @ts-ignore
        const result = await lambdaLoader.callLambda(lambdaName, request.body)
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
