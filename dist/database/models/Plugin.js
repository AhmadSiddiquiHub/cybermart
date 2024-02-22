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
exports.Plugin = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
let Plugin = class Plugin {
};
exports.Plugin = Plugin;
__decorate([
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Plugin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_name' }),
    __metadata("design:type", String)
], Plugin.prototype, "pluginName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_avatar' }),
    __metadata("design:type", String)
], Plugin.prototype, "pluginAvatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_avatar_path' }),
    __metadata("design:type", String)
], Plugin.prototype, "pluginAvatarPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_type' }),
    __metadata("design:type", String)
], Plugin.prototype, "pluginType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_additional_info' }),
    __metadata("design:type", String)
], Plugin.prototype, "pluginAdditionalInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_status' }),
    __metadata("design:type", Number)
], Plugin.prototype, "pluginStatus", void 0);
exports.Plugin = Plugin = __decorate([
    (0, typeorm_1.Entity)('plugins')
], Plugin);
//# sourceMappingURL=Plugin.js.map