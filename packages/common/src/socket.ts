export interface WsProxy<T = any> {
    send: (wsMsgData: WsMsgData<T>) => void
    onClose: <T> (fun: (wsMsgData: WsMsgData<T>) => void) => void
}

export interface WsMsgData<T = any> {
    context: {
        taskId: string;
        seqNo: number;
        messageId: string;
        status: 'success' | 'error' | 'fail' | 'init' | 'partial' | 'finish' | 'confirm';
        timeStr: string;
        action: string;
    }
    payload: T;
}

export class BaseWsProxy<ProxyType> {
    wsProxy: ProxyType;

    constructor(wsProxy: ProxyType) {
        this.wsProxy = wsProxy;
    }
}