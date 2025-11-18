export type Constructor<T = any> = abstract new (...args: any[]) => T;

export class SchemeParam {
    prefix?: string = '';
    method?: 'post' | 'get' = 'post';
}

export type KeyNameType<T extends string, IdType = string | number> = {
    [key in T]: IdType
}
// 保留原对象所有属性，但将 K 变为必选
export type RequireKey<O, K extends keyof O> = Required<Pick<O, K>> &
    // 其他属性全部变为可选
    Partial<Omit<O, K>>;

// 4. 修正 RouterApi 泛型定义
export type RouterApi<T extends { [key: string]: SchemeParam }> = {
    [K in keyof T]: (...params: any) => Promise<any>;
};

export type ApiMethod<T extends { [key: string]: SchemeParam }> = {
    [K in keyof T]: <B = any, R = any>(body: B) => Promise<R>;
};


