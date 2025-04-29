import type {Api} from "./controller.api.js";
import {Log} from "../prisma/models/index.js";
import {BaseWsProxy, WsMsgData, WsProxy} from "../socket.js";

export abstract class LogApi extends BaseWsProxy<WsProxy> implements Api<LogApi> {
    getApiUrl() {
        return {
            namespace: "/log",
            methods: {
                // todo 支持方法，描述等
                "startSaveLog": '/startSaveLog',
                "updateSaveLog": '/updateSaveLog',
                "stopSaveLog": '/stopSaveLog',
            }
        }
    }

    abstract startSaveLog(logInfo: WsMsgData<Log>): Promise<void>;

    abstract updateSaveLog(logInfo: WsMsgData<Log>): Promise<void>;

    abstract stopSaveLog(logInfo: WsMsgData<Log>): Promise<void>;
}