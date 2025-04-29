import {UserApi} from "@mono/common/src/api/UserApi";
import type {Api} from "@mono/common";
import {WsProxy} from "@mono/common/src/socket";
import {WsMsgFun} from "@mono/backend/src/router";
import {v4 as uuidv4} from "uuid";
import {format} from "date-fns";

export class WsDispatchClient implements WsProxy {
    websocket: WebSocket = new WebSocket('ws://localhost:3000/websocket');

    constructor() {
        this.websocket.onmessage = async (message) => {
            try {
                const msg = message.data.toString();
                if (!msg) {
                    return;
                }
                let data: WsMsgData = JSON.parse(msg);
                console.log(`data ${JSON.stringify(data)}`)
                let promise = this.map.get(data.context.taskId)
                if (promise) {
                    this.map.delete(data.taskId)
                    return await promise(data)
                }
            } catch (e) {

            }
        }
    }

    map = new Map<string, WsMsgFun>()

    createRouterClient<T extends abstract new (...args: any) => Api>(t: T): InstanceType<T> {
        // @ts-ignore
        const api = new t() as InstanceType<T>;
        let apiUrl = api.getApiUrl();
        apiUrl.namespace;
        for (let methodsKey in apiUrl.methods) {
            // @ts-ignore
            api[methodsKey] = async (arg: any) => {
                const taskId = uuidv4();
                this.websocket.send(JSON.stringify({
                    context: {
                        taskId,
                        seqNo: 1,
                        messageId: uuidv4(),
                        status: 'init',
                        timeStr: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        action: `${apiUrl.namespace}.${methodsKey}`,
                    },
                    payload: arg,
                }))
                return await new Promise((resolve, reject) => {
                    this.map.set(taskId, (wsMsgData) => {
                        resolve(wsMsgData)
                    })
                })
            }
        }
        return api;
    }
}

// const wsDispatchClient = new WsDispatchClient()
// export const userApi = wsDispatchClient.createRouterClient(UserApi)
export const userApi = new UserApi()

