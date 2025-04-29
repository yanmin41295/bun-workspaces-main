import 'reflect-metadata';
import {controllerKey, requestMappingKey} from "./annotation.js";
import {BaseController, Constructor, MethodNames} from "./common.js";
import {glob} from "glob";

export class Container {
    currentMethods: { methodName: string, routerPath: string, args: any }[] = []

    // todo 存储文件路径等信息
    private constructorInstanceMap: Map<Constructor<BaseController>, BaseController> = new Map()

    private routerInstanceMap: Map<string, [BaseController, string]> = new Map()


    addHandler(methodName: string, routerPath: string, args: any) {
        this.currentMethods.push({methodName, routerPath, args})
    }

    // 扫描并注册类
    async scanPackage(packagePath: string) {
        const files = await glob(`${packagePath}/**/*.{ts,js}`)
        for (const file of files) {
            const module = await import(file)
            for (const exported of Object.values(module)) {
                if (typeof exported === 'function' && Reflect.getMetadata(controllerKey, exported)) {
                    const controllerPath = Reflect.getMetadata(controllerKey, exported);
                    this.registerClass(exported as Constructor, controllerPath)
                }
            }
        }
    }


    // 注册类
    registerClass<T extends BaseController>(target: Constructor<T>, controllerPath: string) {
        const instance = new target()
        this.constructorInstanceMap.set(target, instance)
        // 注册路由
        for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
            const routePath = Reflect.getMetadata(requestMappingKey, target.prototype, propertyName)
            if (routePath) {
                // todo 注册路由,重复抛异常
                this.routerInstanceMap.set(`${controllerPath}.${routePath}`, [instance, propertyName])
            }
        }
    }

    getHandler<T extends BaseController>(routerPath: string): [T, MethodNames<T>] {
        return this.routerInstanceMap.get(routerPath) as [T, MethodNames<T>]
    }

    // 获取实例,多例
    getInstance<T extends BaseController>(routerPath: string): [T, MethodNames<T>] {
        const [instance, methodName] = this.routerInstanceMap.get(routerPath) as [T, MethodNames<T>]
        return this.routerInstanceMap.get(routerPath) as [T, MethodNames<T>]
    }

    async initNestRouter() {
        await this.scanPackage("./controller")
    }
}

