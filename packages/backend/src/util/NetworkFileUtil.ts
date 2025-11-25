import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {createWriteStream} from 'fs';
import * as fs from 'fs/promises';
import FormData from 'form-data';
import path from 'path';

/**
 * 上传文件到指定URL
 * @param url 上传的目标URL
 * @param filePath 要上传的文件路径
 * @param fileName 上传后的文件名
 * @param additionalData 附加数据
 * @param config 可选的axios配置
 */
export async function uploadFile(
    url: string,
    filePath: string,
    fileName: string,
    additionalData?: Record<string, any>,
    config?: AxiosRequestConfig
): Promise<AxiosResponse> {
    // 读取文件内容
    let fileData: Buffer;
    try {
        fileData = await fs.readFile(filePath);
    } catch (error) {
        throw new Error(`Failed to read file '${filePath}': ${error instanceof Error ? error.message : String(error)}`);
    }

    // 使用 FormData 构造请求体
    const formData = new FormData();

    // 添加文件数据
    formData.append('file', fileData, {filename: fileName});

    // 添加文件名字段
    formData.append('filename', fileName);

    // 添加附加数据
    if (additionalData) {
        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });
    }

    const defaultConfig: AxiosRequestConfig = {
        headers: {
            ...formData.getHeaders()
        }
    };

    const finalConfig = {
        ...defaultConfig,
        ...config
    };

    return axios.post(url, formData, finalConfig);
}

/**
 * 从指定URL下载文件
 * @param url 下载文件的URL
 * @param config 可选的axios配置
 */
export async function downloadFile(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse> {
    const defaultConfig: AxiosRequestConfig = {
        responseType: 'blob'
    };

    const finalConfig = {
        ...defaultConfig,
        ...config
    };

    return axios.get(url, finalConfig);
}

/**
 * 下载文件并保存到指定路径 (Node.js环境)
 * @param url 下载文件的URL
 * @param outputDir 保存文件的目录路径
 * @param fileNewName
 * @param config 可选的axios配置
 */
export async function downloadFileToPath(url: string, outputDir: string, fileNewName?: string, config?: AxiosRequestConfig): Promise<string> {
    const response = await axios({
        method: 'GET',
        url,
        responseType: 'stream',
        ...config
    });

    // 从响应头中提取文件名
    let filename = fileNewName ?? '';
    if (!filename) {
        const contentDisposition = response.headers['content-disposition'];
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
            }
        }
    }
    const outputPath = path.join(outputDir, filename);
    const writer = createWriteStream(outputPath);
    response.data.pipe(writer);
    return new Promise<string>((resolve, reject) => {
        writer.on('finish', () => resolve(outputPath));
        writer.on('error', reject);
    });
}