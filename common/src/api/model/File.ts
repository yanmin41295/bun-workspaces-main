export class FileEntity {
    id: number = 0;
    originFileName: string = '';
    mimeType: string = '';
    size: number = 0;
    md5: string = '';
    uploadTime: Date = new Date();
    description: string = '';
}