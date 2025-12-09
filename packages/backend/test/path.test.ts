import {describe, it, expect, vi} from 'vitest';
import path from "path";


/**
 *
 app <name> [server]   -a <action> -p [...port]
 *
 *
 */
describe('node:path', () => {
    it('resolve relative path', () => {
        const relativePath = './relative/path';
        const baseDir = 'D:\\codespace\\bun-workspaces-main'
        let resolvedPath = path.resolve(baseDir, relativePath);
        expect(resolvedPath).toBe(path.join(baseDir, relativePath));
        resolvedPath = path.resolve(relativePath, baseDir,);
        expect(resolvedPath).toBe(path.join(baseDir, relativePath));
        // 恢复原始函数
    });
});