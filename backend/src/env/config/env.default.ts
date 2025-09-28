import {Env} from "../env.loader.js";

const env: Env = {
    server: {
        port: 8080
    },
    database: {
        url: 'mongodb://localhost:27017/test'
    },
    logging: {
        level: 'debug',
        dir: 'logs',
        filename: 'app.log'
    },
    gitBash: 'C:\\Program Files\\Git\\bin\\bash.exe'
}


export default env;