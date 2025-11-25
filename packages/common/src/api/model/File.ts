export class FileEntity {
    id: number = 0;
    originFileName: string = '';
    size: number = 0;
    md5: string = '';
    uploadTime: Date = new Date();
    type: string = '';
    tag: string = ''
    description: string = '';
    filepath: string = '';
    filename: string = '';

    constructor(fileEntity?: FileEntity) {
        Object.assign(this, fileEntity ?? {});
    }
}

export class FileEntityVo extends FileEntity {
    zipped: boolean = true;
    childrenFiles: string[] = [];
}



export class FileApi {

    $prefix = '/file'

    async updateFile(body: any): Promise<any> {
        throw new Error('Not implemented')
    }

    async findFiles(body: any): Promise<any> {
        throw new Error('Not implemented')
    }

    async deleteFiles(body: any): Promise<any> {
        throw new Error('Not implemented')
    }

    async uploadFile(body: any): Promise<any> {
        throw new Error('Not implemented')
    }

    async listExtracted(body: any): Promise<any> {
        throw new Error('Not implemented')
    }

    async extract(body: any): Promise<any> {
        throw new Error('Not implemented')
    }
}


