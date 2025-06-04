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
exports.CreatorhGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let CreatorhGuard = class CreatorhGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = request.cookies['access_token'];
        if (!token) {
            console.log(token);
            response.redirect('/auth/login');
            return false;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET || "super-secret",
            });
            request["user"] = payload;
            if (payload.role !== 'creator') {
                console.log(`User is not an admin:👎${payload.role}`);
                response.json({ message: `Access Denied: Invalid token your role:${payload.role}` });
                return false;
            }
            return true;
        }
        catch (err) {
            console.log(err);
            response.send('Access Denied: Invalid token');
            return false;
        }
    }
};
exports.CreatorhGuard = CreatorhGuard;
exports.CreatorhGuard = CreatorhGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], CreatorhGuard);
//# sourceMappingURL=creator.guard.js.map