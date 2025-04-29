import {WebSocket} from "@fastify/websocket";
import {container, LOGGER} from "./server.js";
import {getRequestId} from "./log.js";
import {AsyncLocalStorage} from 'async_hooks';

class Directive<T = any> {
    action: string = '';
    messageId: string = '';
    taskId: string = '';
    data: T
}

export class TaskProcessor {
    private webSocket: WebSocket;
    directive: Directive

    constructor(webSocket: WebSocket, directive: Directive) {
        this.webSocket = webSocket;
        this.directive = directive;
    }

    send<T>(data: T) {
        this.webSocket.send(JSON.stringify(data))
    }
}

const taskProcessorStorage = new AsyncLocalStorage<TaskProcessor>();

export class RouterHandler {
    webSocket: WebSocket;

    constructor(socket: WebSocket) {
        this.webSocket = socket;
    }

    dispatch() {
        this.webSocket.on('message', async (message) => {
            try {
                const msg = message.toString();
                LOGGER.info({msg});
                if (!msg) {
                    return;
                }
                let directive: Directive = JSON.parse(msg);
                if (!directive.action) {
                    throw new Error('invalid message')
                }
                const [instance, methodName] = container.getHandler(directive.action);
                if (!instance || !methodName) {
                    throw new Error('invalid message')
                }
                const taskProcessor = new TaskProcessor(this.webSocket, directive);
                await taskProcessorStorage.run(taskProcessor, async () => {
                    // @ts-ignore
                    const promiseTask = instance[methodName](...directive.data)
                    if (methodName === 'asyncTask') {
                        this.webSocket.send(JSON.stringify({
                            action: 'asyncTask',
                        }));
                    } else {
                        const result = await promiseTask
                        this.webSocket.send(JSON.stringify(result))
                    }
                })
            } catch (e) {
                LOGGER.error('invalid message %s', getRequestId(), e);
                this.webSocket.send(JSON.stringify({
                    header: {
                        code: 'error',
                    }, payload: {
                        msg: 'invalid message'
                    }
                }))
            }
        })
    }

}