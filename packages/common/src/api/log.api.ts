import type {Api} from "./controller.api.js";
import {Log, User} from "../prisma/models/index.js";

export abstract class LogApi implements Api<LogApi> {
    getApiUrl() {
        return {
            namespace: "/log",
            methods: {
                // todo 支持方法，描述等
                "saveLog": '/saveLog',
            }
        }
    }

    abstract saveLog(logInfo: Log): Promise<Log>;
}