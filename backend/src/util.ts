import fs from "fs";
import * as path from "node:path";

export function createDirSync(dir: string) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        return
    }
    return fs.mkdirSync(dir, {recursive: true})
}

export function getFilePath(...paths: string[]) {
    return path.join(process.cwd(), ...paths)
}