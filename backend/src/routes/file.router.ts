import {FastifyReply, FastifyRequest} from "fastify";
import path from "node:path";
import fs, {stat} from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import {pipeline} from "stream/promises";
import {LOGGER} from "../server.js";
import db from "../db/knex.js";
import {FileApi, FileEntity, FileEntityVo,} from "@mono/common/src/api/model/File.ts";
import yauzl from "yauzl";
import {MultipartFile} from "@fastify/multipart";
import {FileUtil} from "../util/FileUtil.js";

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
try {
    await fs.access(uploadDir);
} catch {
    await fs.mkdir(uploadDir, {recursive: true});
}


export class FileRouterHandler extends FileApi {
    async uploadFile(request: FastifyRequest<any>) {
        const parts = request.parts();
        const uploadedFiles: FileEntity[] = [];

        for await (const filePart of parts) {
            const part = filePart as MultipartFile;
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
            }
        }
        return uploadedFiles
    }

    async downloadFile(request: FastifyRequest<any>, reply: FastifyReply) {
        try {
            const {filename} = request.params as { filename: string };

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
    }

    async listExtracted(request: FastifyRequest<any>) {
        const {filename} = request.body as { filename: string };
        // 获取解压目录中的文件列表
        return await fs.readdir(await getUnzipDir(filename))
    }

    async extract(request: FastifyRequest<any>) {
        const {filename} = request.body as { filename: string };
        const extractDir = getUnzipPath(filename)
        const filepath = await getUploadFilePath(filename);
        // 创建解压目录
        await ensureDir(extractDir);
        // 打开 ZIP 文件
        const zipfile = await openZip(filepath);
        try {
            // 读取 ZIP 文件条目
            const entries = await readZipEntries(zipfile);
            // 解压所有条目
            for (const entry of entries) {
                await extractEntryTo(zipfile, entry, extractDir);
            }
            return FileUtil.readdir(extractDir)
        } finally {
            zipfile.close();
        }
    }

    async findFiles() {
        const files = await db('files').select<FileEntity[]>('*');
        // 检查每个 ZIP 文件是否有对应的解压目录
        const fileList: FileEntityVo[] = [];
        for (const file of files) {
            const fileEntity = new FileEntityVo(file);
            fileEntity.zipped = await isZipped(file.filename)
            if (fileEntity.zipped) {
                let unzipDir = await getUnzipDir(fileEntity.filename);
                fileEntity.childrenFiles = await FileUtil.readdir(unzipDir);
            }
            fileList.push(fileEntity);
        }
        return fileList;
    }

    async deleteFiles(request: FastifyRequest<any>) {
        const fileInfos = request.body as { filename: string, id: number }[];
        for (let fileInfo of fileInfos) {
            let filePath = await getUploadFilePath(fileInfo.filename)
            await FileUtil.removeFileOrDir(filePath)
            const unzipDir = await getUnzipDir(fileInfo.filename);
            if (unzipDir) {
                await FileUtil.removeFileOrDir(unzipDir);
            }
            await db('files').where({filename: fileInfo.filename}).del();
        }
    }

    async updateFile(request: FastifyRequest<any>) {
        const {id, tag, description} = request.body as { id: number, tag?: string, description?: string };
        const files = await db('files').where({id: id}).select<FileEntity[]>('*');
        if (files.length === 0) {
            return
        }
        // 准备要更新的字段
        const updateData: any = {};
        if (tag !== undefined) {
            updateData.tag = tag;
        }
        if (description !== undefined) {
            updateData.description = description;
        }
        // 如果没有提供任何可更新的字段
        if (Object.keys(updateData).length === 0) {
            return
        }
        // 更新数据库中的记录
        await db('files').where({id: id}).update(updateData);
    }
}

export const fileRouter = new FileRouterHandler();

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

async function getUploadFilePath(filename: string) {
    return path.join(uploadDir, filename)
}

async function isZipped(filename: string) {
    if (!filename.endsWith('.zip')) {
        return false
    }
    return !!await getUnzipDir(filename)
}

async function getUnzipDir(filename: string) {
    let unzipDir = getUnzipPath(filename);
    return await FileUtil.exists(unzipDir) ? unzipDir : ''
}

function getUnzipPath(filename: string) {
    const nameWithoutExt = path.basename(filename, '.zip');
    return path.join(uploadDir, `${nameWithoutExt}_unzip`)
}

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

