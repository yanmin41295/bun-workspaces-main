import {Command, Option} from "commander";

/**
 * 动态生成命令行程序的函数
 * @param commandConfig 命令配置对象
 * @returns 生成的Commander实例
 */
export function generateCommand(commandConfig: any): Command {
    // 创建新的Command实例
    const program = new Command();

    // 设置命令名称和描述
    program
        .name(commandConfig.name)
        .description(commandConfig.description);

    // 添加参数（如果有的话）
    if (commandConfig.argument) {
        program.argument(
            `<${commandConfig.argument.name}>`,
            commandConfig.argument.description
        );
    }

    // 添加选项(options)
    if (commandConfig.options) {
        Object.keys(commandConfig.options).forEach(key => {
            const option = commandConfig.options[key];
            const flag = `${option.short || ''}, ${option.long || ''}`.replace(/,$/, '').trim();
            if (option.choices && option.defaultValue !== undefined) {
                let opt = new Option(flag, option.description).choices(option.choices)
                program.addOption(opt)
            } else if (option.defaultValue !== undefined) {
                program.option(flag, option.description, option.defaultValue);
            } else {
                program.option(flag, option.description);
            }
        });
    }

    // 添加必需选项(requiredOptions)
    if (commandConfig.requiredOptions) {
        Object.keys(commandConfig.requiredOptions).forEach(key => {
            const option = commandConfig.requiredOptions[key];
            const flag = `${option.short}, ${option.long}`.trim();
            program.requiredOption(flag, option.description);
        });
    }

    // 添加子命令(commands)
    if (commandConfig.command) {
        Object.keys(commandConfig.command).forEach(key => {
            const subCmdConfig = commandConfig.command[key];
            const subCmd = program
                .command(subCmdConfig.name)
                .description(subCmdConfig.description);

            // 为子命令添加选项
            if (subCmdConfig.options) {
                Object.keys(subCmdConfig.options).forEach(optKey => {
                    const option = subCmdConfig.options[optKey];
                    const flag = `${option.short || ''}, ${option.long || ''}`.replace(/,$/, '').trim();
                    subCmd.option(flag, option.description);
                });
            }

            // 设置子命令的动作
            if (subCmdConfig.action) {
                subCmd.action(subCmdConfig.action);
            }
        });
    }

    // 设置主命令的动作
    if (commandConfig.action) {
        program.action(commandConfig.action);
    }
    program.action((args: string[], options: { [key: string]: string[] }, command: Command) => {
    })
    return program;
}

