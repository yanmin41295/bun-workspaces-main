export abstract class BaseController {
    [key: string]: Function
}
export type  Constructor<T = any> = new (...args: any[]) => T;
export type MethodNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T];