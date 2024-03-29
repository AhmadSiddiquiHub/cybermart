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
exports.OpenBoxSubscription = void 0;
const typeorm_1 = require("typeorm");
let OpenBoxSubscription = class OpenBoxSubscription {
};
exports.OpenBoxSubscription = OpenBoxSubscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], OpenBoxSubscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], OpenBoxSubscription.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_email' }),
    __metadata("design:type", String)
], OpenBoxSubscription.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], OpenBoxSubscription.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_subscribed' }),
    __metadata("design:type", Number)
], OpenBoxSubscription.prototype, "isSubscribed", void 0);
exports.OpenBoxSubscription = OpenBoxSubscription = __decorate([
    (0, typeorm_1.Entity)('open_box_subscription')
], OpenBoxSubscription);
//# sourceMappingURL=OpenBoxSubscription.js.map