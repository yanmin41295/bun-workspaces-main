import {stdin, stdout} from "node:process";
import {exec, spawn} from 'child_process';

stdin.on("data", (data) => {
    const input = data.toString().trim();
    // 在这里对输入的命令进行处理
    handleCommand(input);
});

function handleCommand(command: string) {
    console.log(command)
    if (command === "help") {
        stdout.write("Available commands: help, exit\n");
    } else if (command === "exit") {
        process.exit(0);
    } else {
        stdout.write(`Command "${command}" not recognized. Try 'help'.\n`);
    }
}


export async function execute(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    })
}

export function runAll(command: string, args: string[]) {
    return spawn(command, args);
}