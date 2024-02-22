"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Site = void 0;
const typeorm_1 = require("typeorm");
let Site = class Site {
};
exports.Site = Site;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Site.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", Number)
], Site.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso1' }),
    __metadata("design:type", String)
], Site.prototype, "iso1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zipcode_formate' }),
    __metadata("design:type", Number)
], Site.prototype, "zipcodeFormate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fb_link' }),
    __metadata("design:type", String)
], Site.prototype, "fbLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'insta_link' }),
    __metadata("design:type", String)
], Site.prototype, "instaLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'twitter_link' }),
    __metadata("design:type", String)
], Site.prototype, "twitterLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'linkedin_link' }),
    __metadata("design:type", String)
], Site.prototype, "linkedinLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'youtube_link' }),
    __metadata("design:type", String)
], Site.prototype, "youtubeLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pinterest_link' }),
    __metadata("design:type", String)
], Site.prototype, "pinterestLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'favicon' }),
    __metadata("design:type", String)
], Site.prototype, "favicon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo' }),
    __metadata("design:type", String)
], Site.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website_link' }),
    __metadata("design:type", String)
], Site.prototype, "websiteLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bucket_base_url' }),
    __metadata("design:type", String)
], Site.prototype, "bucketBaseUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'play_store_app_url' }),
    __metadata("design:type", String)
], Site.prototype, "playStoreAppUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apple_store_app_url' }),
    __metadata("design:type", String)
], Site.prototype, "appleStoreAppUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_code_play_store_app' }),
    __metadata("design:type", String)
], Site.prototype, "QRCodePlayStoreApp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_code_apple_store_app' }),
    __metadata("design:type", String)
], Site.prototype, "QRCodeAppleStoreApp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol' }),
    __metadata("design:type", String)
], Site.prototype, "currencySymbol", void 0);
exports.Site = Site = __decorate([
    (0, typeorm_1.Entity)('sites')
], Site);
//# sourceMappingURL=Site.js.map