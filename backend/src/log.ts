import fs from "fs";
import ProgramEnv from "./env.loader.js";
import * as path from "node:path";
import pino from "pino";
import {format} from "date-fns";
import {fastifyRequestContext, requestContext, RequestContextData} from "@fastify/request-context";
import {FastifyInstance, FastifyRequest} from "fastify";

export const requestIdHeader = "x-request-id";
export const requestIdKey = "requestId";

declare module '@fastify/request-context' {
    interface RequestContextData {
        [requestIdKey]: string
    }
}


export function createLogHandler() {
    if (!fs.existsSync(ProgramEnv.logging.dir)) {
        fs.mkdirSync(ProgramEnv.logging.dir, {recursive: true});
    }
    const logFileStream = fs.createWriteStream(path.join(ProgramEnv.logging.dir, ProgramEnv.logging.filename), {flags: 'a'});
    return {
        stream: pino.multistream([{stream: process.stdout}, {stream: logFileStream}]),
        redact: ['req.headers.authorization'], // 移除敏感信息
        serializers: {
            req(request: FastifyRequest) {
                return {
                    method: request.method,
                    url: request.url,
                    parameters: request.params,
                    // Including the headers in the log could be in violation
                    // of privacy laws, e.g. GDPR. You should use the "redact" option to
                    // remove sensitive fields. It could also leak authentication data in
                    // the logs.
                    headers: request.headers
                };
            }
        },
        timestamp: () => `,"time":"${format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')}"`,
        mixin: (mergeObject: object, level: number) => ({
            [requestIdKey]: requestContext.get(requestIdKey), // 将requestId添加到日志记录中
            ...mergeObject,
        }),
        formatters: {
            level: (label: string, number: number) => {
                return {level: label};
            }
        }
    }
}

export function getRequestId() {
    return requestContext.get(requestIdKey)
}

export async function registerLogRequestContext(server: FastifyInstance) {
// 注册异步存储 也可以用 cls-rtracer
    await server.register(fastifyRequestContext, {
        defaultStoreValues: request => ({
            [requestIdKey]: request.headers[requestIdHeader] as unknown as string,
        }) as RequestContextData,
    });
    return server.log;
}