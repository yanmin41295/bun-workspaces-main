import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {
    exists,
    readFile,
    writeFile,
    appendFile,
    removeFile,
    copyFile,
    mkdir,
    readdir,
    extname,
    basename,
    filename,
    parsePath,
    joinPath,
    readJsonFile,
    writeJsonFile
} from '../../src/util/FileUtil.js';
import * as path from 'path';


describe('FileUtil', () => {
    const testDir = path.join(process.cwd(), 'test-temp');
    const testFile = path.join(testDir, 'test.txt');
    const testJsonFile = path.join(testDir, 'test.json');

    beforeEach(async () => {
        // 创建测试目录
        await mkdir(testDir, {recursive: true});
    });

    afterEach(async () => {
        // 清理测试文件和目录
        try {
            await removeFile(testFile);
        } catch (e) {
        }

        try {
            await removeFile(testJsonFile);
        } catch (e) {
        }

        try {
            await removeFile(testDir);
        } catch (e) {
        }
    });

    it('should create and check file existence', async () => {
        expect(await exists(testFile)).toBe(false);
        await writeFile(testFile, 'test content');
        expect(await exists(testFile)).toBe(true);
    });

    it('should write and read file content', async () => {
        const content = 'Hello, World!';
        await writeFile(testFile, content);
        const readContent = await readFile(testFile);
        expect(readContent).toBe(content);
    });

    it('should append content to file', async () => {
        await writeFile(testFile, 'Hello');
        await appendFile(testFile, ', World!');
        const content = await readFile(testFile);
        expect(content).toBe('Hello, World!');
    });

    it('should handle JSON files', async () => {
        const testData = {name: 'test', value: 123};
        await writeJsonFile(testJsonFile, testData);
        const readData = await readJsonFile(testJsonFile);
        expect(readData).toEqual(testData);
    });

    it('should copy file', async () => {
        const content = 'copy test content';
        await writeFile(testFile, content);

        const copiedFile = path.join(testDir, 'copied.txt');
        await copyFile(testFile, copiedFile);

        const readContent = await readFile(copiedFile);
        expect(readContent).toBe(content);

        // 清理复制的文件
        await removeFile(copiedFile);
    });

    it('should handle directories', async () => {
        const subDir = path.join(testDir, 'subdir');
        await mkdir(subDir);

        const files = await readdir(testDir);
        expect(files).toContain('subdir');

        await removeFile(subDir);
    });

    it('should extract file extensions', () => {
        expect(extname('file.txt')).toBe('.txt');
        expect(extname('file.tar.gz')).toBe('.gz');
        expect(extname('file')).toBe('');
    });

    it('should extract basename', () => {
        expect(basename('file.txt')).toBe('file');
        expect(basename('/path/to/file.txt')).toBe('file');
        expect(basename('file')).toBe('file');
    });

    it('should extract filename', () => {
        expect(filename('file.txt')).toBe('file.txt');
        expect(filename('/path/to/file.txt')).toBe('file.txt');
        expect(filename('file')).toBe('file');
    });

    it('should parse path', () => {
        const parsed = parsePath('/path/to/file.txt');
        expect(parsed.dir).toBe(path.join('/', 'path', 'to'));
        expect(parsed.base).toBe('file.txt');
        expect(parsed.ext).toBe('.txt');
        expect(parsed.name).toBe('file');
    });

    it('should join paths', () => {
        expect(joinPath('path', 'to', 'file.txt')).toBe(path.join('path', 'to', 'file.txt'));
    });
});