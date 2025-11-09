import {beforeEach, describe, expect, it} from 'vitest';
import {exists, mkdir, writeFile} from '../../src/util/FileUtil.js';
import * as path from 'path';
import {downloadFile, downloadFileToPath, uploadFile} from "../../src/util/NetworkFileUtil.js";

describe('FileUtil', () => {
    const testDir = path.join(process.cwd(), 'test');
    const testResourceDir = path.join(testDir, 'resources');
    const testFile = path.join(testResourceDir, 'test.txt');

    beforeEach(async () => {
        // 创建测试目录
        await mkdir(testDir, {recursive: true});
    });


    it('uploadFile', async () => {
        const resp = await uploadFile('http://localhost:3000/upload', testFile, 'test.txt')
        console.log(resp)
    });

    it('downloadFile', async () => {
        const resp = await downloadFileToPath('http://localhost:3000/download/test.txt', path.join(process.cwd(), 'test', 'test-temp'))
        console.log(resp)
    });

});