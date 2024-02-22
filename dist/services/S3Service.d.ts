export declare class S3Service {
    fileUploadBase64(folderName: string, file: any): Promise<any>;
    fileUploadMultipart(folderName: string, file: any): Promise<any>;
    imageUploadMultipart(folderName: string, image: any): Promise<any>;
    imageUpload(folderName: string, base64Image: any, imageType: string): Promise<any>;
    getObject(key: string): Promise<any>;
}
