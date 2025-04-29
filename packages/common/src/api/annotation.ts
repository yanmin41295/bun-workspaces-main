export const controllerKey = '$controller'
export const requestMappingKey = '$requestMapping'

export function RequestMapping(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(requestMappingKey, path, target, propertyKey)
    }
}

export function Controller(path: string) {
    return function (target: any) {
        Reflect.defineMetadata(controllerKey, path, target)
    }
}
