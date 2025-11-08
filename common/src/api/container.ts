import 'reflect-metadata';
import {glob} from "glob";
import {controllerKey, requestMappingKey} from "@mono/common/src/api/annotation.js";
import {SpiLoader} from "../spi/SpiLoader.js";

export type  Constructor<T = any> = new (...args: any[]) => T;

export abstract class BaseController {
    [key: string]: Function
}

async function checkIfExportsSubclass(module: any, baseClass: any): Promise<boolean> {
    try {
        // 获取默认导出
        const exported = module.default;

        // 检查是否为类且是目标类的子类
        return typeof exported === 'function' &&
            exported.prototype instanceof baseClass &&
            exported !== baseClass; // 排除自身
    } catch (error) {
        console.error('检查文件导出时出错:', error);
        return false;
    }
}

export class Container implements SpiLoader<Map<string, [Function, any, string]>> {
    lambdaMap: Map<string, [Function, any, string]> = new Map();

    async load(packagePath: string, packageRootPath: string = process.cwd()): Promise<Map<string, [Function, any, string]>> {
        const files = await glob(`${packageRootPath}/${packagePath}/**/*.{ts,js}`)
        for (const file of files) {
            const module = await this.resolveImportPath(`${packageRootPath}/${file}`);
            if (!await checkIfExportsSubclass(module, BaseController)) {
                continue
            }
            for (const exported of Object.values(module)) {
                const controller = exported as Constructor<BaseController>
                if (typeof exported === 'function' && Reflect.getMetadata(controllerKey, controller)) {
                    let LambdaService = exported as Constructor<BaseController>
                    const controllerPath = Reflect.getMetadata(controllerKey, LambdaService);
                    for (const propertyName of Object.getOwnPropertyNames(LambdaService.prototype)) {
                        if (propertyName === 'constructor') {
                            continue
                        }
                        const routePath = Reflect.getMetadata(requestMappingKey, LambdaService.prototype, propertyName)
                        const lambdaService = new LambdaService()
                        //@ts-ignore
                        this.lambdaMap.set(`${controllerPath}-${routePath}`, [lambdaService[propertyName], lambdaService, propertyName])
                    }
                }
            }
        }
        return this.lambdaMap;
    }

    callLambda(routerPath: string, body: any): Promise<any> {
        const lambda = this.lambdaMap.get(routerPath)
        if (!lambda) {
            throw new Error(`Lambda ${routerPath} not found`)
        }
        return lambda[0].call(lambda[1], body)
    }

    async resolveImportPath(file: string) {
        return import(file)
    }
}


function relative(from: string, to: string): string {
    // 处理路径分隔符，统一使用 /
    const fromParts = from.split('/').filter(part => part && part !== '.');
    const toParts = to.split('/').filter(part => part && part !== '.');

    // 解析 .. 上级目录
    const resolveParts = (parts: string[]): string[] => {
        const resolved: string[] = [];
        for (const part of parts) {
            if (part === '..') {
                if (resolved.length > 0 && resolved[resolved.length - 1] !== '..') {
                    resolved.pop();
                } else {
                    resolved.push(part);
                }
            } else {
                resolved.push(part);
            }
        }
        return resolved;
    };

    const normalizedFrom = resolveParts(fromParts);
    const normalizedTo = resolveParts(toParts);

    // 找到共同的路径前缀长度
    let commonLength = 0;
    while (commonLength < normalizedFrom.length &&
    commonLength < normalizedTo.length &&
    normalizedFrom[commonLength] === normalizedTo[commonLength]) {
        commonLength++;
    }

    // 计算需要向上返回的层级
    const upCount = normalizedFrom.length - commonLength;
    const upParts = upCount > 0 ? Array(upCount).fill('..') : [];

    // 计算需要向下进入的路径
    const downParts = normalizedTo.slice(commonLength);

    // 组合所有部分
    const relativeParts = [...upParts, ...downParts];

    // 处理特殊情况
    if (relativeParts.length === 0) {
        return '.';
    }

    return relativeParts.join('/');
}