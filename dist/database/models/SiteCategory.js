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
exports.SiteCategory = void 0;
const typeorm_1 = require("typeorm");
let SiteCategory = class SiteCategory {
};
exports.SiteCategory = SiteCategory;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'site_id' }),
    __metadata("design:type", String)
], SiteCategory.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'cat_id' }),
    __metadata("design:type", String)
], SiteCategory.prototype, "catId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'show_in_menu' }),
    __metadata("design:type", Number)
], SiteCategory.prototype, "showInMenu", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], SiteCategory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'featured' }),
    __metadata("design:type", Number)
], SiteCategory.prototype, "featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'top_of_month' }),
    __metadata("design:type", Number)
], SiteCategory.prototype, "topOfMonth", void 0);
exports.SiteCategory = SiteCategory = __decorate([
    (0, typeorm_1.Entity)('site_categories')
], SiteCategory);
//# sourceMappingURL=SiteCategory.js.map