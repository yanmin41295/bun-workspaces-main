export abstract class BaseController {

}

export type  Constructor<T = any> = new (...args: any[]) => T;
export type MethodNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T];