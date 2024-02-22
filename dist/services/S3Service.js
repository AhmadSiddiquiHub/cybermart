"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const AWS = require("aws-sdk");
const env_1 = require("../env");
const common_1 = require("@nestjs/common");
AWS.config.update({
    accessKeyId: env_1.env.aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_1.env.aws.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3({
    accessKeyId: env_1.env.aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_1.env.aws.AWS_SECRET_ACCESS_KEY,
    region: env_1.env.aws.AWS_DEFAULT_REGION,
});
let S3Service = class S3Service {
    fileUploadBase64(folderName = '', file) {
        const params = {
            Bucket: env_1.env.aws.AWS_BUCKET,
            Key: folderName,
            Body: file,
            ContentEncoding: 'base64',
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
    fileUploadMultipart(folderName, file) {
        const params = {
            Bucket: env_1.env.aws.AWS_BUCKET,
            Key: folderName,
            Body: file,
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
    imageUploadMultipart(folderName, image) {
        const params = {
            Bucket: env_1.env.aws.AWS_BUCKET,
            Key: folderName,
            Body: image.buffer,
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
            });
        });
    }
    imageUpload(folderName = '', base64Image, imageType) {
        const params = {
            Bucket: env_1.env.aws.AWS_BUCKET,
            Key: folderName,
            Body: base64Image,
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
                return resolve({ path: locationPath });
            });
        });
    }
    getObject(key) {
        const bucketParams = {
            Bucket: env_1.env.aws.AWS_BUCKET,
            Key: key,
        };
        return new Promise((resolve, reject) => {
            return s3.getObject(bucketParams, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
        });
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
//# sourceMappingURL=S3Service.js.map