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
exports.CategoryML = void 0;
const typeorm_1 = require("typeorm");
let CategoryML = class CategoryML {
};
exports.CategoryML = CategoryML;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], CategoryML.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cat_id' }),
    __metadata("design:type", Number)
], CategoryML.prototype, "catId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lang_id' }),
    __metadata("design:type", Number)
], CategoryML.prototype, "langId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], CategoryML.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_title' }),
    __metadata("design:type", String)
], CategoryML.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_keyword' }),
    __metadata("design:type", String)
], CategoryML.prototype, "metaKeyword", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_description' }),
    __metadata("design:type", String)
], CategoryML.prototype, "metaDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], CategoryML.prototype, "isActive", void 0);
exports.CategoryML = CategoryML = __decorate([
    (0, typeorm_1.Entity)('categories_ml')
], CategoryML);
//# sourceMappingURL=CategoryML.js.map