import {Command} from 'commander';

export const program = new Command('va')
program.version('0.1.0')
    // 必选参数,不可以设置默认值
    .argument('<username>', 'user to login')
    // 可选参数
    .argument('[password]', 'password for user, if required', '123456')
    // 最后一个参数才能是 ...rest
    .argument('[books...]', 'books to read')
    // 字符串类型选项，必选，可以设置默认值
    .requiredOption('-p, --port <port>', 'port to use', '8080')
    // 字符串类型选项，可选
    .option('-s, --server <server...>', 'server to use', 'localhost')
    // 布尔类型选项
    .option('-d, --debug', 'output extra debugging', false)
    // 声明的所有参数列表，然后是选项对象，然后是command
    .action((username, password, books, options, command) => {
        console.log('username:', username);
        console.log('password:', password);
    })
    .addCommand(
        new Command('list')   // 必选参数,可以设置默认值
            .argument('<username>', 'user to login')
            // 可选参数
            .argument('[password...]', 'password for user, if required')
            // 字符串类型选项，必选，可以设置默认值
            .requiredOption('-p, --port <port>', 'port to use', '8080')
            // 字符串类型选项，可选
            .option('-s, --server <server...>', 'server to use', 'localhost')
            // 布尔类型选项·
            .option('-d, --debug', 'output extra debugging', false)
            // 声明的所有参数列表，然后是选项对象，然后是command
            .action((username, password, options, command) => {
                console.log('username:', username);
                console.log('password:', password);
            })
    )

