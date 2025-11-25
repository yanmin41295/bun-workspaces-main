import {test} from "vitest";
import {spawn} from "child_process";

test('service ioc', async () => {

    const isWindows = process.platform === 'win32';
    const command = isWindows ? 'cmd' : 'ls';
    const args = isWindows ? ['/c', 'dir'] : ['-la'];
    const shellProcess = spawn(command, args);
    shellProcess.stdout.on('data', (data: Buffer) => {
        console.log(data.toString());
    });
    shellProcess.stderr.on('data', (data: Buffer) => {
        console.log(data.toString());
    });
    shellProcess.on('close', (code: number) => {
        console.log(`Process exited with code ${code}`);
    });
    shellProcess.on('error', (error: Error) => {
        console.log(`Process error: ${error.message}`);
    });
    await  new Promise(resolve => setTimeout(resolve, 10000))
})