export type CallBack<T, E = any> = (err: E, data: T) => void

export interface RouterItem {
    routerId: string;
    name: string;
    path: string;
    component: string;
    children: RouterItem[]
    menuMeta?: MenuMeta
}


export interface MenuMeta {
    menuId: string;
    title: string;
    icon: string;
}

export interface MenuItem extends MenuMeta {
    path: string;
    children: MenuItem[]
}


export interface WsMsgData<T = any> {
    header: {
        messageId: string;
        taskId: string;
        step: number;
        controller: string;
        function: string;
        code: 'success' | 'error' | 'fail';
    };
    payload: T;
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 辅助类型：深度必须类型
export  type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
