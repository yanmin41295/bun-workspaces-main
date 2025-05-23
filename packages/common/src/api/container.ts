import 'reflect-metadata';
import {controllerKey, requestMappingKey} from "./annotation.js";
import {BaseController, Constructor, MethodNames} from "./common.js";

export class Container {
    currentMethods: { methodName: string, routerPath: string, args: any }[] = []

    // todo 存储文件路径等信息
    private constructorInstanceMap: Map<Constructor<BaseController>, BaseController> = new Map()

    private routerInstanceMap: Map<string, [BaseController, string]> = new Map()

    addHandler(methodName: string, routerPath: string, args: any) {
        this.currentMethods.push({methodName, routerPath, args})
    }

    scanAnnotation<T extends BaseController>(target: Constructor<T>) {
        const controllerPath = Reflect.getMetadata(controllerKey, target);
        const apiMethods: { propertyName: string, routePath: string }[] = []
        for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
            const routePath = Reflect.getMetadata(requestMappingKey, target.prototype, propertyName)
            if (routePath) {
                apiMethods.push({propertyName, routePath})
            }
        }
        return {
            controllerPath,
            apiMethods
        }
    }

    // 注册类
    registerClass<T extends BaseController>(target: Constructor<T>) {
        const {controllerPath, apiMethods} = this.scanAnnotation(target)
        const instance = new target()
        this.constructorInstanceMap.set(target, instance)
        // 注册路由
        for (const apiMethod of apiMethods) {
            this.routerInstanceMap.set(`${controllerPath}.${apiMethod.routePath}`, [instance, apiMethod.propertyName])
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
}

