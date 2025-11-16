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


// 3. 接口方案定义（确保 Data 和 Body 类型正确）
export const fileApiScheme = {
    updateFile: {},
    findFiles: {},
    deleteFiles: {},
    uploadFile: {},
    listExtracted: {},
    extract: {},
} as const;


