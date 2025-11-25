import {Command, Option} from "commander";
import {generateCommand} from "./dynamic-command-generator.ts";

interface CommandOption {
    name: string;
    description?: string;
    argument?: { name: string; description?: string; defaultValue?: string[]; } // 支持一个名称参数
    options?: {
        [key: string]: {
            short?: string;
            long?: string;
            description?: string;
            choices?: string[];
            defaultValue?: string[];
            args?: string[]
        }
    };
    requiredOptions?: {
        [key: string]: {
            short?: string;
            long?: string;
            description?: string;
            defaultValue?: string | string[];
        }
    };
    action: (args: string[], options: {
        [key: string]: string[]
    }, command: Command, mainProgramArgs?: string[], mainProgramOpts?: {
        [key: string]: string | string[]
    }) => void;
    command?: {
        [key: string]: CommandOption
    };
}


function createCommand(commandConfig: CommandOption, mainProgram?: Command) {
    const program = new Command(commandConfig.name);
    if (commandConfig.description) {
        program.description(commandConfig.description);
    }
    if (commandConfig.argument) {
        program.argument(`<${commandConfig.argument.name}>`, commandConfig.argument.description ?? '', commandConfig.argument.defaultValue ?? []);
    }
    if (commandConfig.options) {
        for (const optionKey in commandConfig.options) {
            const option = commandConfig.options[optionKey];
            const opt = new Option([option.short ?? '', option.long ?? ''].filter(Boolean).join(', '), option.description ?? '')
            opt.default(option.defaultValue ?? [])
            if (option.choices) {
                opt.choices(option.choices);
            }
            program.addOption(opt);
        }
    }
    if (commandConfig.requiredOptions) {
        for (const optionKey in commandConfig.requiredOptions) {
            const option = commandConfig.requiredOptions[optionKey];
            const opt = new Option([option.short ?? '', option.long ?? ''].filter(Boolean).join(', '), option.description ?? '')
            opt.default(option.defaultValue ?? [])
            program.requiredOption(opt.flags, opt.description, opt.defaultValue);
        }
    }

    if (commandConfig.command) {
        for (const commandKey in commandConfig.command) {
            const command = commandConfig.command[commandKey];
            program.addCommand(createCommand(command, mainProgram));
        }
    }
    program.action((args: string[], options: { [key: string]: string[] }, command: Command) => {
        commandConfig.action(args, options, command, mainProgram?.args ?? [], mainProgram?.opts() ?? {});
    })
    return program;
}

export function createProgram(commandConfig: CommandOption) {
    return createCommand(commandConfig);
}


export const optionCommand = {
    name: 'app',
    description: 'app',
    argument: {name: 'service', description: '指定服务'},
    options: {
        lang: {
            short: '-l',
            long: '--lang',
            description: '指定语言',
            choices: ['zh', 'en'],
            defaultValue: 'zh'
        }
    },
    requiredOptions: {
        user: {
            short: '-u',
            long: '--user <user>',
            description: '指定用户',
            choices: ['admin', 'user'],
        }
    },
    command: {
        start: {
            name: 'start',
            description: '启动服务',
            options: {
                name: {
                    short: '-n',
                    long: '--name <name>',
                    description: '指定名称',
                }
            },
            action: () => {
            }
        }
    },
    action: () => {
    }
}
generateCommand(optionCommand)

// 导出动态生成命令的函数
export {generateCommand} from './dynamic-command-generator';
