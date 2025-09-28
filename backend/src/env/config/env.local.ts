import {Env} from "../env.loader.js";
import {DeepPartial} from "@mono/common/src/types.js";

const env: DeepPartial<Env> = {
    server: {
        port: 3000
    },
    database: {
        url: "file:D:\\codespace\\bun-workspaces-main\\packages\\backend\\database\\db.sqlite"
    },
    logging: {
        level: 'info',
        dir: "D:\\codespace\\bun-workspaces-main\\logs",
        filename: 'app.log'
    },
    gitBash: "D:\\devsoft\\Git\\bin\\bash.exe"
}


export default env;