import {describe, it, expect, vi} from 'vitest';
import path from "path";
import {Directory, File} from "../src/File";

describe('File', () => {
    it('zip single file', async () => {
        const file = new File('./test/test-temp/zipFolder/test.txt');
        let str = ''
        for (let i = 0; i < 10000; i++) {
            str += `test ${i}\n`
        }
        await file.writeText(str)
        const zipFile = await file.toZipFile()
        expect(zipFile.absPath).toBe(path.resolve('./test/test-temp/zipFolder/test.txt.zip'));
    });

    it('zip directory', async () => {
        const file = new Directory('./test/test-temp/zipFolder');
        const zipFile = await file.toZipFile()
        expect(file.absPath + '.zip').toBe(path.resolve(zipFile.absPath));
    });

    it('unzip directory', async () => {
        const zipFile = new File('./test/test-temp/zipFolder.zip');
        const result = await zipFile.unzip()
        expect(path.resolve(zipFile.dirname, zipFile.shortname)).toBe(path.resolve(result.absPath));
    });
});