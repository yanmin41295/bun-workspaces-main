import {getFilePath} from "./util.js";
import fs from "fs";
import JSON5 from 'json5'

export interface ProgramEnv {
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
    }
}

export async function initEnv(filename: string = 'env.json5'): Promise<ProgramEnv> {
    let envFilePath = getFilePath(filename);
    if (fs.existsSync(envFilePath)) {
        let json5Text = fs.readFileSync(envFilePath, 'utf8')
        return JSON5.parse(json5Text) as ProgramEnv;
    } else {
        throw new Error(`env file not exists: ${envFilePath}`);
    }
}

const ProgramEnv = await initEnv()
export default ProgramEnv