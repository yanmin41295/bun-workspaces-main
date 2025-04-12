import {Command} from 'commander';
import pkg from '../package.json';
import inquirer from 'inquirer';

const program = new Command()

export function ha(args: string[]) {
    program.name('ha')
        .version(pkg.version, '-V, --version', "display version info")
        .description("display version info")
    // 命令参数相当于函数参数的作用对象，命令的核心作用对象或数据，选项用于提供额外的控制或配置信息来调整命令的执行方式
    program.command('start [service]')
        .option('-p, --port <number>', 'port number', '8080')
        .description("start service").usage('xxxxxx')
        .action(async (name, options, command) => {
            console.log('start service')
            console.log({name, options})
        })
    program.command('stop [service]')
        .option('-p, --port <number>', 'port number', '8080')
        .description("stop service")
        .action(async (name, options, command) => {
            console.log('stop service')
            console.log({name, options})
            const data = await inquirer.prompt([{
                type: 'input',
                name: 'port',
                message: "输入端口号"
            }, {
                type: 'confirm',
                name: 'isAgree',
                message: '是否启动服务？',
            },])
            console.log(data)
        })

    program.parse(args)
}

ha(Bun.argv)