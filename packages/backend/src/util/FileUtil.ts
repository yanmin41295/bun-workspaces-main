/**
 * 文件操作工具函数集合 (基于 Node.js API)
 */
import * as fs from 'fs/promises';
import * as path from 'path';
import {Stats} from "node:fs";
import {LOGGER} from "../server.ts";


export namespace FileUtil {
    /**
     * 递归删除目录及其所有子目录和文件
     * @param dstPath 目录路径
     */
    export async function removeFileOrDir(dstPath: string): Promise<boolean> {
        try {
            const stats = await fs.stat(dstPath);
            if (stats.isDirectory()) {
                await fs.rmdir(dstPath, {recursive: true});
            } else {
                await fs.unlink(dstPath);
            }
            return true;
        } catch (error) {
            LOGGER.error(`Failed to remove directory '${dstPath}': ${(error as Error).stack}`);
        }
        return false
    }

    /**
     * 检查文件或目录是否存在
     * @param path 文件或目录路径
     * @returns 如果存在返回 true，否则返回 false
     */
    export async function exists(path: string): Promise<boolean> {
        try {
            await fs.access(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 读取文件内容为字符串
     * @param path 文件路径
     * @param encoding 编码格式，默认为 utf-8
     * @returns 文件内容字符串
     */
    export async function readFile(path: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
        try {
            return await fs.readFile(path, {encoding});
        } catch (error) {
            throw new Error(`Failed to read file '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 读取文件内容为 JSON 对象
     * @param path JSON 文件路径
     * @returns 解析后的 JSON 对象
     */
    export async function readJsonFile<T = any>(path: string): Promise<T> {
        try {
            const content = await readFile(path);
            return JSON.parse(content) as T;
        } catch (error) {
            throw new Error(`Failed to read JSON file '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 将内容写入文件
     * @param path 文件路径
     * @param content 要写入的内容
     * @param encoding 编码格式，默认为 utf-8
     * @returns Promise<void>
     */
    export async function writeFile(path: string, content: string, encoding: BufferEncoding = 'utf-8'): Promise<void> {
        try {
            await fs.writeFile(path, content, {encoding});
        } catch (error) {
            throw new Error(`Failed to write file '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 将对象写入 JSON 文件
     * @param path 文件路径
     * @param data 要写入的对象
     * @param space 缩进空格数，默认为 2
     * @returns Promise<void>
     */
    export async function writeJsonFile(path: string, data: any, space: number = 2): Promise<void> {
        try {
            const content = JSON.stringify(data, null, space);
            await writeFile(path, content);
        } catch (error) {
            throw new Error(`Failed to write JSON file '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 追加内容到文件末尾
     * @param path 文件路径
     * @param content 要追加的内容
     * @param encoding 编码格式，默认为 utf-8
     * @returns Promise<void>
     */
    export async function appendFile(path: string, content: string, encoding: BufferEncoding = 'utf-8'): Promise<void> {
        try {
            await fs.appendFile(path, content, {encoding});
        } catch (error) {
            throw new Error(`Failed to append to file '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 获取文件信息
     * @param path 文件路径
     * @returns 文件信息对象
     */
    export async function stat(path: string): Promise<Stats> {
        try {
            return await fs.stat(path);
        } catch (error) {
            throw new Error(`Failed to get file stats for '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 删除文件
     * @param path 文件路径
     * @returns Promise<void>
     */
    export async function removeFile(path: string): Promise<void> {
        try {
            await fs.unlink(path);
        } catch (error) {
            throw new Error(`Failed to remove file '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 创建目录
     * @param path 目录路径
     * @param options 创建选项
     * @returns Promise<void>
     */
    export async function mkdir(path: string, options?: { recursive?: boolean }): Promise<void> {
        try {
            await fs.mkdir(path, options);
        } catch (error) {
            throw new Error(`Failed to create directory '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 读取目录内容
     * @param path 目录路径
     * @returns 目录中的文件和文件夹列表
     */
    export async function readdir(path: string): Promise<string[]> {
        try {
            return await fs.readdir(path);
        } catch (error) {
            LOGGER.error(`Failed to read directory '${path}': ${error instanceof Error ? error.message : String(error)}`);
        }
        return [];
    }

    /**
     * 复制文件
     * @param src 源文件路径
     * @param dest 目标文件路径
     * @returns Promise<void>
     */
    export async function copyFile(src: string, dest: string): Promise<void> {
        try {
            await fs.copyFile(src, dest);
        } catch (error) {
            throw new Error(`Failed to copy file from '${src}' to '${dest}': ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 获取文件扩展名
     * @param filePath 文件路径
     * @returns 文件扩展名（包括点号），如果无扩展名则返回空字符串
     */
    export function extname(filePath: string): string {
        return path.extname(filePath);
    }

    /**
     * 获取文件名（不包括扩展名）
     * @param filePath 文件路径
     * @returns 不包含扩展名的文件名
     */
    export function basename(filePath: string): string {
        const base = path.basename(filePath);
        const ext = extname(filePath);
        return ext ? base.slice(0, -ext.length) : base;
    }

    /**
     * 获取文件完整名
     * @param filePath 文件路径
     * @returns 文件名（包括扩展名）
     */
    export function filename(filePath: string): string {
        return path.basename(filePath);
    }

    /**
     * 解析路径
     * @param filePath 路径
     * @returns 解析后的路径对象
     */
    export function parsePath(filePath: string): {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string
    } {
        return path.parse(filePath);
    }

    /**
     * 连接路径
     * @param paths 路径片段
     * @returns 连接后的路径
     */
    export function joinPath(...paths: string[]): string {
        return path.join(...paths);
    }
}
