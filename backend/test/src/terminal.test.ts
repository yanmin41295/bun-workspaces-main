import {test} from "vitest";
import {spawn, ChildProcess} from 'child_process';
import {platform,} from 'os';
import readline from 'readline';

// 1. 跨平台命令行配置（类型明确）
const shell: string = platform() === 'win32' ? 'cmd.exe' : 'bash';
const shellArgs: string[] = platform() === 'win32' ? ['/K'] : [];
test('service ioc', async () => {
    await runTestCommands();
    await new Promise(resolve => setTimeout(resolve, 10000))
    console.log('\n⏳ 正在关闭命令行窗口...');
    cmdProcess.stdin?.end();
    cmdProcess.kill();
})
// 2. 创建交互式子进程（明确类型为 ChildProcess）
let cmdProcess: ChildProcess;

try {
    cmdProcess = spawn(shell, shellArgs, {
        stdio: 'pipe',  // 类型约束：只能是 'pipe'/'inherit'/'ignore' 等合法值
        cwd: process.cwd(),
        env: process.env,
        detached: true,
        shell: false
    });
} catch (err) {
    console.error('子进程创建失败：', err as Error);
    process.exit(1); // 创建失败直接退出
}

// 3. 实时捕获输出（处理编码和类型）
cmdProcess.stdout?.on('data', (data: Buffer) => {
    // Windows cmd 用 gbk 解码，其他系统用 utf8
    const encoding = platform() === 'win32' ? 'gbk' : 'utf8';
    console.log('[命令行输出]', data.toString());
});

cmdProcess.stderr?.on('data', (data: Buffer) => {
    const encoding = platform() === 'win32' ? 'gbk' : 'utf8';
    console.error('[命令行错误]', data.toString());
});

// 4. 监听子进程状态事件
cmdProcess.on('close', (code: number | null) => {
    console.log(`命令行窗口已关闭，退出码：${code ?? '未知'}`);
    process.exit(0);
});

cmdProcess.on('error', (err: Error) => {
    console.error('子进程异常：', err.message);
    process.exit(1);
});

// 5. 向命令行发送命令（类型安全函数）
/**
 * 向交互式命令行发送命令并执行
 * @param command 要执行的终端命令（如 'dir'、'ls -l'）
 */
function sendCommand(command: string): void {
    // 类型守卫：确保 stdin 存在且可写入
    if (!cmdProcess.stdin || !cmdProcess.stdin.writable) {
        console.error('❌ 命令行输入流已关闭，无法发送命令');
        return;
    }

    if (typeof command !== 'string' || command.trim() === '') {
        console.error('❌ 命令不能为空');
        return;
    }

    // 发送命令（结尾必须加 \n 模拟回车）
    cmdProcess.stdin.write(command.trim() + '\n');
}

// 6. 可选：用户手动输入命令（终端交互）
function initUserInput(): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '📝 请输入要发送的命令（输入 exit 退出）：'
    });

    rl.prompt();

    rl.on('line', (input: string) => {
        const trimmedInput = input.trim();
        if (trimmedInput === 'exit') {
            rl.close();
            cmdProcess.stdin?.end();
            cmdProcess.kill();
            return;
        }
        sendCommand(trimmedInput);
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('\n👋 终端输入已关闭');
    });
}

// ------------------------------
// 测试示例（自动发送命令）
// ------------------------------
async function runTestCommands() {
    const testCommands = platform() === 'win32'
        ? [
            {cmd: 'dir', delay: 1000},    // Windows：查看目录
            {cmd: 'node -v', delay: 3000}, // 查看 Node 版本
            {cmd: 'echo 你好，Windows 命令行', delay: 5000}
        ]
        : [
            {cmd: 'ls -l', delay: 1000},   // macOS/Linux：查看目录
            {cmd: 'node -v', delay: 3000}, // 查看 Node 版本
            {cmd: 'echo 你好，Linux/macOS 命令行', delay: 5000}
        ];

    testCommands.forEach(({cmd, delay}) => {
        setTimeout(() => sendCommand(cmd), delay);
    });


}
