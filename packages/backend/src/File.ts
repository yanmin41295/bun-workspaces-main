import fs from "node:fs"
import AdmZip from "adm-zip";
import path from "node:path";

export abstract class AbstractFile<T extends AbstractFile<T>> {
    absPath: string;

    constructor(filePath: string) {
        this.absPath = path.resolve(filePath);
    }

    get dirname(): string {
        return path.dirname(this.absPath);
    }

    get basename(): string {
        return path.basename(this.absPath);
    }

    get shortname(): string {
        return path.basename(this.absPath).split('.').slice(0, -1).join('.');
    }

    async stat(): Promise<fs.Stats | undefined> {
        try {
            return await fs.promises.stat(this.absPath);
        } catch (e) {
            return undefined;
        }
    }

    async checkExist() {
        const stats = await this.stat();
        return !!stats
    }

    async isDirectory() {
        let stat = await this.stat()
        if (stat) {
            return stat.isDirectory()
        }
        return false
    }

    async isFile() {
        return (await this.stat())?.isFile() ?? false;
    }

    abstract copy(newPath: T): Promise<T>

    abstract delete(): Promise<void>

    async move(dst: T): Promise<T> {
        await fs.promises.rename(this.absPath, dst.absPath);
        return dst
    }

    async toZipFile(destination?: string, options?: { overwrite?: boolean, password?: string }): Promise<File> {
        const zip = new AdmZip();
        let isDirectory = await this.isDirectory();
        // 添加当前文件到 ZIP
        if (isDirectory) {
            zip.addLocalFolder(this.absPath);
        } else {
            zip.addLocalFile(this.absPath);
        }
        await zip.writeZipPromise(destination || this.absPath + ".zip", {overwrite: options?.overwrite ?? true,});
        return new File(destination || this.absPath + ".zip");
    }

}

export class Directory extends AbstractFile<Directory> {
    async copy(newDirectory: Directory): Promise<Directory> {
        await fs.promises.cp(this.absPath, newDirectory.absPath, {recursive: true});
        return newDirectory
    }

    delete(): Promise<void> {
        return fs.promises.rm(this.absPath, {recursive: true, force: true});
    }

    async zip(destination: string, options?: { overwrite?: boolean, password?: string }) {
        const zip = new AdmZip();
        zip.addLocalFolder(this.absPath);
        await zip.writeZipPromise(destination, {overwrite: options?.overwrite ?? true,});
        return new File(destination)
    }

    async isFile() {
        return false;
    }

    async listFiles(): Promise<AbstractFile<File | Directory>[]> {
        const files = await fs.promises.readdir(this.absPath);
        const filePromises = files.map(async file => {
            const filePath = path.resolve(this.absPath, file);
            const stats = await fs.promises.stat(filePath);
            if (stats.isDirectory()) {
                return new Directory(filePath);
            } else if (stats.isFile()) {
                return new File(filePath);
            }
            return undefined;
        });
        return (await Promise.all(filePromises)).filter((file): file is File | Directory => file !== undefined);
    }

    async walkFiles(callback: (file: File) => Promise<void>): Promise<void> {
        const files = await this.listFiles();
        for (let file of files) {
            if (await file.isDirectory()) {
                await (file as Directory).walkFiles(callback);
            } else if (await file.isFile()) {
                await callback(file as File);
            }
        }
    }
}

export class File extends AbstractFile<File> {
    async copy(newFile: File): Promise<File> {
        await fs.promises.copyFile(this.absPath, newFile.absPath);
        return newFile
    }

    async delete(): Promise<void> {
        await fs.promises.unlink(this.absPath);
    }

    async isDirectory(): Promise<boolean> {
        return false
    }

    async readText(): Promise<string> {
        if (!await this.checkExist()) {
            return "";
        }
        return await fs.promises.readFile(this.absPath, {encoding: "utf-8"});
    }

    async writeText(text: string): Promise<void> {
        await fs.promises.writeFile(this.absPath, text, {encoding: "utf-8"});
    }

    async appendText(text: string): Promise<void> {
        await fs.promises.appendFile(this.absPath, text, {encoding: "utf-8", flag: "a"});
    }

    async readBinary(): Promise<Buffer> {
        if (!await this.checkExist()) {
            return Buffer.alloc(0);
        }
        return await fs.promises.readFile(this.absPath);
    }

    async writeBinary(buffer: Buffer): Promise<void> {
        await fs.promises.writeFile(this.absPath, buffer);
    }

    async appendBinary(buffer: Buffer): Promise<void> {
        await fs.promises.appendFile(this.absPath, buffer, {flag: "a"});
    }

    get extension(): string {
        return path.extname(this.absPath);
    }

    async unzipDirectory(destination: string, options?: { overwrite?: boolean, password?: string }) {
        const zip = new AdmZip(this.absPath);
        zip.extractAllTo(destination, options?.overwrite ?? true, false, options?.password);
        return new Directory(destination)
    }

    getZipFiles() {
        const zip = new AdmZip(this.absPath);
        return zip.getEntries()
    }

    async unzip(destination?: string, options?: { overwrite?: boolean, password?: string }): Promise<Directory> {
        const zip = new AdmZip(this.absPath);
        return await new Promise((resolve, reject) => {
            zip.extractAllToAsync(destination ?? path.resolve(this.dirname, this.shortname), options?.overwrite ?? true, false, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Directory(destination ?? path.resolve(this.dirname, this.shortname)));
                }
            });
        });
    }
}


