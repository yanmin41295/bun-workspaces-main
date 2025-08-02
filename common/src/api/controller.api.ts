export interface Api<T extends Api<{ getApiUrl(): any }> = Api<{ getApiUrl(): any }>> {
    getApiUrl(): {
        namespace: string,
        methods: {
            [key in Exclude<keyof T, 'getApiUrl' | 'wsProxy'>]: string
        }
    }
}

export function getMethods(cls: any): string[] {
    const methods: string[] = [];
    let proto = cls.prototype;
    while (proto && proto !== Object.prototype) {
        Object.getOwnPropertyNames(proto).forEach(name => {
            if (name !== 'constructor' && typeof proto[name] === 'function') {
                methods.push(name);
            }
        });
        proto = Object.getPrototypeOf(proto);
    }
    return methods;
}