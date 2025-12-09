import {describe, it, expect, vi} from 'vitest';
import {program} from "../src/cli/command";


/**
 *
 app <name> [server]   -a <action> -p [...port]
 *
 *
 */
describe('CLI Program with Arguments', () => {


    it('should handle command with arguments', () => {

        // 模拟console.log来捕获输出
        const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {
        });
        process.argv = ['node', 'test.js', '--version'];
        // 执行程序
        program.parse(process.argv);
        // 恢复原始函数
    });
});