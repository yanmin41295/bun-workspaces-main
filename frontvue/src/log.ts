import {dummyLogger, type Logger} from "ts-log";

const enableLogger = true;

export class ConsoleLogger implements Logger {
    [x: string]: any;

    debug(message?: any, ...optionalParams: any[]): void {
        if (enableLogger) {
            console.debug(message, optionalParams);
        }
    }

    error(message?: any, ...optionalParams: any[]): void {
        if (enableLogger) {
            console.error(message, optionalParams);
        }
    }

    info(message?: any, ...optionalParams: any[]): void {
        if (enableLogger) {
            console.info(message, optionalParams);
        }
    }

    trace(message?: any, ...optionalParams: any[]): void {
        if (enableLogger) {
            console.trace(message, optionalParams);
        }
    }

    warn(message?: any, ...optionalParams: any[]): void {
        if (enableLogger) {
            console.warn(message, optionalParams);
        }
    }

}


export const logger: Logger = new ConsoleLogger()