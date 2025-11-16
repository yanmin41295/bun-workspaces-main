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
}