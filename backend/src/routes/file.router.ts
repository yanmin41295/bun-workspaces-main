import {FastifyPluginAsync} from "fastify";
import path from "node:path";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import {pipeline} from "stream/promises";
import {LOGGER} from "../server.js";
import {stat} from "fs/promises";
import db from "../db/knex.js";
import {FileEntity} from "../../../common/src/api/model/File.ts";
import yauzl from "yauzl";
import fastifyMultipart, {MultipartFile} from "@fastify/multipart";

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
try {
    await fs.access(uploadDir);
} catch {
    await fs.mkdir(uploadDir, {recursive: true});
}

// 生成带时间戳的文件名
const generateTimestampFilename = (originalFilename: string): string => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;

    if (originalFilename) {
        const ext = path.extname(originalFilename);
        const name = path.basename(originalFilename, ext);
        return `${name}_${timestamp}${ext}`;
    } else {
        return `upload_${timestamp}.dat`;
    }
};

// 递归创建目录
const ensureDir = async (dirPath: string) => {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, {recursive: true});
    }
};

// 获取文件的扩展名
const getFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
    }
    return '';
};


// 将 yauzl 的回调 API 转换为 Promise API
const openZip = (path: string): Promise<yauzl.ZipFile> => {
    return new Promise((resolve, reject) => {
        yauzl.open(path, {lazyEntries: true, autoClose: false}, (err, zipfile) => {
            if (err) {
                reject(err);
            } else {
                resolve(zipfile);
            }
        });
    });
};

const readZipEntries = (zipfile: yauzl.ZipFile): Promise<yauzl.Entry[]> => {
    return new Promise((resolve, reject) => {
        const entries: yauzl.Entry[] = [];

        zipfile.on("entry", (entry: yauzl.Entry) => {
            // 过滤掉不安全的文件名
            if (!entry.fileName.includes('..\\') && !entry.fileName.includes('../')) {
                entries.push(entry);
            }
            zipfile.readEntry();
        });

        zipfile.on("end", () => {
            resolve(entries);
        });

        zipfile.on("error", (err) => {
            reject(err);
        });

        zipfile.readEntry();
    });
};

const extractEntryTo = (zipfile: yauzl.ZipFile, entry: yauzl.Entry, extractPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        // 如果是目录，直接创建目录
        if (entry.fileName.endsWith("/")) {
            const dirPath = path.join(extractPath, entry.fileName);
            // 确保目录路径在解压目录内，防止路径遍历
            if (dirPath.startsWith(extractPath)) {
                fs.mkdir(dirPath, {recursive: true})
                    .then(() => resolve())
                    .catch(reject);
            } else {
                resolve(); // 忽略不安全的路径
            }
            return;
        }

        zipfile.openReadStream(entry, (err, readStream) => {
            if (err) {
                reject(err);
                return;
            }

            if (!readStream) {
                reject(new Error("Failed to open read stream"));
                return;
            }

            const filePath = path.join(extractPath, entry.fileName);

            // 确保文件路径在解压目录内，防止路径遍历
            if (!filePath.startsWith(extractPath)) {
                resolve(); // 忽略不安全的路径
                return;
            }

            // 确保目标目录存在
            const dirPath = path.dirname(filePath);
            fs.mkdir(dirPath, {recursive: true})
                .then(() => {
                    // 写入文件
                    const writeStream = createWriteStream(filePath);
                    readStream.pipe(writeStream);

                    writeStream.on("close", () => {
                        resolve();
                    });

                    writeStream.on("error", (err) => {
                        reject(err);
                    });
                })
                .catch(reject);
        });
    });
};

const fileRouters: FastifyPluginAsync = async (server) => {
    server.post('/upload', async (request, reply) => {
        try {
            // 获取上传的文件（支持多个文件）
            const parts = request.parts();
            const uploadedFiles: FileEntity[] = [];

            for await (const part of parts) {
                if (part.file) {
                    // 生成带时间戳的文件名
                    const filename = generateTimestampFilename(part.filename || '');
                    const filepath = path.join(uploadDir, filename);

                    console.log(`Processing file: ${part.filename}, saving as: ${filename}`);

                    // 保存文件，使用 pipeline 处理流
                    await pipeline(part.file, createWriteStream(filepath));

                    // 获取文件信息
                    const fileStats = await stat(filepath);

                    // 创建文件实体
                    const fileEntity = new FileEntity();
                    fileEntity.originFileName = part.filename || '';
                    fileEntity.size = fileStats.size;
                    fileEntity.md5 = '';
                    fileEntity.uploadTime = new Date();
                    fileEntity.type = getFileExtension(filename);
                    fileEntity.tag = '';
                    fileEntity.description = '';
                    fileEntity.filepath = filepath;
                    fileEntity.filename = filename;

                    // 保存到数据库
                    await db('files').insert({
                        originFileName: fileEntity.originFileName,
                        size: fileEntity.size,
                        md5: fileEntity.md5,
                        uploadTime: fileEntity.uploadTime,
                        type: fileEntity.type,
                        tag: fileEntity.tag,
                        description: fileEntity.description,
                        filepath: fileEntity.filepath,
                        filename: fileEntity.filename
                    });
                    uploadedFiles.push(fileEntity);
                } else {
                    // 处理非文件字段（如果有需要）
                    console.log(`Field ${part.fieldname}: ${part.value}`);
                }
            }

            if (uploadedFiles.length === 0) {
                return reply.status(400).send({error: 'No files uploaded'});
            }

            LOGGER.info(`Upload completed. Total files: ${uploadedFiles.length}`);
            return {
                code: 0,
                message: 'Files uploaded successfully',
                data: uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles
            };
        } catch (error) {
            console.error('Upload error:', error);
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

    // 获取已上传文件列表接口
    server.get('/list', async function (request, reply) {
        try {
            // 从数据库获取所有文件记录
            const files = await db('files').select('*');

            // 检查每个 ZIP 文件是否有对应的解压目录
            const fileList: FileEntity[] = [];
            for (const file of files) {
                const fileEntity = new FileEntity();
                fileEntity.id = file.id;
                fileEntity.originFileName = file.originFileName;
                fileEntity.size = file.size;
                fileEntity.md5 = file.md5;
                fileEntity.uploadTime = new Date(file.uploadTime);
                fileEntity.type = file.type;
                fileEntity.tag = file.tag;
                fileEntity.description = file.description;
                fileEntity.filepath = file.filepath;
                fileEntity.filename = file.filename;

                // 如果是 ZIP 文件，检查是否有对应的解压目录
                if (path.extname(fileEntity.originFileName).toLowerCase() === '.zip') {
                    const nameWithoutExt = path.basename(fileEntity.originFileName, '.zip');
                    const extractDir = path.join(uploadDir, `${nameWithoutExt}_unzip`);
                    try {
                        await fs.access(extractDir);
                        // 如果解压目录存在，添加标记
                        fileEntity.tag = 'extracted';
                    } catch {
                        // 解压目录不存在，保持原样
                    }
                }
                fileList.push(fileEntity);
            }

            return {
                code: 0,
                message: 'Files list retrieved successfully',
                data: fileList.length === 1 ? fileList[0] : fileList
            };
        } catch (error) {
            LOGGER.error('List files error:', error);
            return reply.status(500).send({
                code: -1,
                message: 'Failed to list files',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    });

    // 删除文件接口
    server.delete<{ Params: { id: string } }>('/delete/:id', async function (request, reply) {
        try {
            const {id} = request.params;

            // 先从数据库获取文件信息
            const files = await db('files').where({id: parseInt(id)}).select('*');

            if (files.length === 0) {
                return reply.status(404).send({
                    code: -1,
                    message: 'File not found'
                });
            }

            const file = files[0];

            // 从文件系统中删除文件
            try {
                await fs.unlink(file.filepath);
            } catch (error) {
                LOGGER.warn('Failed to delete file from filesystem:', error);
            }

            // 如果是 ZIP 文件，同时删除对应的解压目录
            if (file.type === 'file' && path.extname(file.originFileName).toLowerCase() === '.zip') {
                const nameWithoutExt = path.basename(file.originFileName, '.zip');
                const extractDir = path.join(uploadDir, `${nameWithoutExt}_unzip`);

                try {
                    await fs.rm(extractDir, {recursive: true, force: true});
                    // 同时删除数据库中的解压记录
                    await db('files').where({
                        originFileName: `${nameWithoutExt}_unzip`,
                        tag: 'extracted_dir'
                    }).del();
                } catch (error) {
                    LOGGER.warn('Failed to delete extract directory:', error);
                }
            }

            // 如果是解压目录，同时删除目录
            if (file.type === 'dir' && file.tag === 'extracted_dir') {
                try {
                    await fs.rm(file.filepath, {recursive: true, force: true});
                } catch (error) {
                    LOGGER.warn('Failed to delete extract directory:', error);
                }
            }

            // 从数据库中删除记录
            await db('files').where({id: parseInt(id)}).del();

            return {
                code: 0,
                message: 'File deleted successfully'
            };
        } catch (error) {
            LOGGER.error('Delete file error:', error);
            return reply.status(500).send({
                code: -1,
                message: 'Failed to delete file',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    });
};

export default {router: fileRouters, prefix: '/file'};