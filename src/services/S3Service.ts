import * as AWS from 'aws-sdk';
import { env } from '../env';
import { Injectable } from '@nestjs/common';

AWS.config.update({
    accessKeyId: env.aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.aws.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3({
    accessKeyId: env.aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.aws.AWS_SECRET_ACCESS_KEY,
    region: env.aws.AWS_DEFAULT_REGION,
});

@Injectable()
export class S3Service {

    public fileUploadBase64(folderName: string = '', file: any): Promise<any> {
        const params = {
            Bucket: env.aws.AWS_BUCKET,
            Key: folderName, // type is not required
            Body: file,
            // ACL: 'public-read',
            ContentEncoding: 'base64',
            // ContentType: `image/${imageType}`,
        };
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    path: data.key
                });
            });
        });
    }

    public fileUploadMultipart(folderName: string, file: any): Promise<any> {
        const params = {
            Bucket: env.aws.AWS_BUCKET,
            Key: folderName, // type is not required
            Body: file,
            // ACL: 'public-read',
            // ContentEncoding: file.encoding,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    path: data.key
                });
            });
        });
    }

    public imageUploadMultipart(folderName: string, image: any): Promise<any> {
        const params = {
            Bucket: env.aws.AWS_BUCKET,
            Key: folderName, // type is not required
            Body: image.buffer,
            // ACL: 'public-read',
            ContentEncoding: image.encoding,
            ContentType: `image/${image.mimetype}`,
        };
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    path: data.key
                });
                // const locationArray = data.Location.split('/');
                // locationArray.pop();
                // const locationPath = locationArray.join('/');
                // return resolve({
                //     path: locationPath
                // });
            });
        });
    }

    public imageUpload(folderName: string = '', base64Image: any, imageType: string): Promise<any> {
        const params = {
            Bucket: env.aws.AWS_BUCKET,
            Key: folderName, // type is not required
            Body: base64Image,
            // ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${imageType}`,
        };

        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                const locationArray = data.Location.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                return resolve({path: locationPath});
            });
        });
    }

    public getObject(key: string): Promise<any> {
        const bucketParams = {
            Bucket: env.aws.AWS_BUCKET,
            Key: key,
        };
        return new Promise((resolve, reject) => {
            return s3.getObject(bucketParams, (err: any, data: any) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        });
    }
}