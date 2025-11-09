import Fastify, {FastifyRequest} from 'fastify'
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import * as path from "node:path";
import {createLogHandler, getRequestId, registerLogRequestContext,} from "./log.js";
import * as fs from "fs/promises";
import {pipeline} from "stream/promises";
import {createWriteStream, createReadStream} from "fs";

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

// 确保上传目录存在
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
try {
    await fs.access(uploadDir);
} catch {
    await fs.mkdir(uploadDir, {recursive: true});
}

server.get('/hello', (request, reply) => {
    LOGGER.info('hello world request %s', getRequestId());
    return {
        hello: "world",
        date: new Date().toLocaleString()
    }
})

// 文件上传接口
server.post('/upload', async function (request, reply) {
    try {
        // 获取上传的文件
        const file = await request.file();
        if (!file) {
            return reply.status(400).send({error: 'No file uploaded'});
        }
        // 生成文件名
        const filename = file.filename || `upload_${Date.now()}.dat`;
        const filepath = path.join(uploadDir, filename);
        // 保存文件，使用 pipeline 处理流
        await pipeline(file.file, createWriteStream(filepath));
        return {
            code: 0,
            message: 'File uploaded successfully',
            data: {
                filename,
                filepath
            }
        };
    } catch (error) {
        LOGGER.error('Upload error:', error);
        return reply.status(500).send({
            code: -1,
            message: 'Upload failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
});

// 文件下载接口
server.get('/download/:filename', async function (request: FastifyRequest<{ Params: { filename: string } }>, reply) {
    try {
        const { filename } = request.params;
        
        // 验证文件名是否安全，防止路径遍历攻击
        if (!filename || filename.includes('../') || filename.includes('..\\')) {
            return reply.status(400).send({error: 'Invalid filename'});
        }
        
        const filepath = path.join(uploadDir, filename);
        
        // 检查文件是否存在
        try {
            await fs.access(filepath);
        } catch {
            return reply.status(404).send({error: 'File not found'});
        }
        
        // 设置响应头，触发浏览器下载
        reply.header('Content-Type', 'application/octet-stream');
        reply.header('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
        
        // 流式发送文件
        const fileStream = createReadStream(filepath);
        return reply.send(fileStream);
    } catch (error) {
        LOGGER.error('Download error:', error);
        return reply.status(500).send({
            code: -1,
            message: 'Download failed',
            error: error instanceof Error ? error.message : String(error)
        });
    }
});

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