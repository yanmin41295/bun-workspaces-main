import {SpiLoader} from "@mono/common/src/spi/SpiLoader.js";

export interface Env {
    server: {
        port: number;
    },
    database: {
        url: string;
    },
    logging: {
        level: string,
        dir: string,
        filename: string,
    },
    gitBash: string;
}

export class EnvLoader implements SpiLoader<Env> {
    env: string = ''

    constructor(env: 'local' | 'dev') {
        this.env = env
    }

    async load(): Promise<Env> {
        const defaultEnv = await import('./config/env.default.ts')
        const env = await import(`./config/env.${this.env}.ts`)
        return {
            ...defaultEnv.default,
            ...env.default
        } as Env
    }
}

const envLoader = new EnvLoader('local')

export default envLoader
