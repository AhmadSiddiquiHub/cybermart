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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const database_1 = require("../database");
let AuthGuard = class AuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (roles.length === 0) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('authorization');
        if (!authorization) {
            return false;
        }
        if (authorization.split(' ')[0] !== 'Bearer') {
            return false;
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            return false;
        }
        try {
            const decoded = jwt.verify(token, '1333@#$%123$%^&*dajcskdn89?)()#$@&haSS', { ignoreExpiration: true });
            const userId = decoded.id;
            const user = await database_1.UserRepository.findOne({ where: { userId, isActive: 1 } });
            console.log('user', user);
            if (!user) {
                return false;
            }
            request.user = user;
            return true;
        }
        catch (error) {
            console.log('error', error);
            return false;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map