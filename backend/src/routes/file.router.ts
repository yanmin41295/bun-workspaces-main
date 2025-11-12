import {FastifyPluginAsync} from "fastify";
import path from "node:path";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import {pipeline} from "stream/promises";
import {LOGGER} from "../server.js";

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
try {
    await fs.access(uploadDir);
} catch {
    await fs.mkdir(uploadDir, {recursive: true});
}
const fileRouters: FastifyPluginAsync = async (server) => {
    server.post('/upload', async (request, reply) => {
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
    })

    // 文件下载接口
    server.get<{ Params: { filename: string } }>('/download/:filename', async function (request, reply) {
        try {
            const {filename} = request.params;

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
}

export default {router: fileRouters, prefix: '/file'}