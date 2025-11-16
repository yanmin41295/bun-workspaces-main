import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {
    FileUtil
} from '../../src/util/FileUtil.js';
import * as path from 'path';


describe('FileUtil', () => {
    const testDir = path.join(process.cwd(), 'test-temp');
    const testFile = path.join(testDir, 'test.txt');
    const testJsonFile = path.join(testDir, 'test.json');

    beforeEach(async () => {
        // 创建测试目录
        await FileUtil.mkdir(testDir, {recursive: true});
    });

    afterEach(async () => {
        // 清理测试文件和目录
        try {
            await FileUtil.removeFile(testFile);
        } catch (e) {
        }

        try {
            await FileUtil.removeFile(testJsonFile);
        } catch (e) {
        }

        try {
            await FileUtil.removeFile(testDir);
        } catch (e) {
        }
    });

    it('should create and check file existence', async () => {
        expect(await FileUtil.exists(testFile)).toBe(false);
        await FileUtil.writeFile(testFile, 'test content');
        expect(await FileUtil.exists(testFile)).toBe(true);
    });

    it('should write and read file content', async () => {
        const content = 'Hello, World!';
        await FileUtil.writeFile(testFile, content);
        const readContent = await FileUtil.readFile(testFile);
        expect(readContent).toBe(content);
    });

    it('should append content to file', async () => {
        await FileUtil.writeFile(testFile, 'Hello');
        await FileUtil.appendFile(testFile, ', World!');
        const content = await FileUtil.readFile(testFile);
        expect(content).toBe('Hello, World!');
    });

    it('should handle JSON files', async () => {
        const testData = {name: 'test', value: 123};
        await FileUtil.writeJsonFile(testJsonFile, testData);
        const readData = await readJsonFile(testJsonFile);
        expect(readData).toEqual(testData);
    });

    it('should copy file', async () => {
        const content = 'copy test content';
        await FileUtil.writeFile(testFile, content);

        const copiedFile = path.join(testDir, 'copied.txt');
        await FileUtil.copyFile(testFile, copiedFile);

        const readContent = await FileUtil.readFile(copiedFile);
        expect(readContent).toBe(content);

        // 清理复制的文件
        await FileUtil.removeFile(copiedFile);
    });

    it('should handle directories', async () => {
        const subDir = path.join(testDir, 'subdir');
        await FileUtil.mkdir(subDir);

        const files = await readdir(testDir);
        expect(files).toContain('subdir');

        await FileUtil.removeFile(subDir);
    });

    it('should extract file extensions', () => {
        expect(FileUtil.extname('file.txt')).toBe('.txt');
        expect(FileUtil.extname('file.tar.gz')).toBe('.gz');
        expect(FileUtil.extname('file')).toBe('');
    });

    it('should extract basename', () => {
        expect(FileUtil.basename('file.txt')).toBe('file');
        expect(FileUtil.basename('/path/to/file.txt')).toBe('file');
        expect(FileUtil.basename('file')).toBe('file');
    });

    it('should extract filename', () => {
        expect(FileUtil.filename('file.txt')).toBe('file.txt');
        expect(FileUtil.filename('/path/to/file.txt')).toBe('file.txt');
        expect(FileUtil.filename('file')).toBe('file');
    });

    it('should parse path', () => {
        const parsed = FileUtil.parsePath('/path/to/file.txt');
        expect(parsed.dir).toBe(path.join('/', 'path', 'to'));
        expect(parsed.base).toBe('file.txt');
        expect(parsed.ext).toBe('.txt');
        expect(parsed.name).toBe('file');
    });

    it('should join paths', () => {
        expect(FileUtil.joinPath('path', 'to', 'file.txt')).toBe(path.join('path', 'to', 'file.txt'));
    });
});