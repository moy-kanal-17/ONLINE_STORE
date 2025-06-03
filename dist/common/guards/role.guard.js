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
exports.RoleRedirectGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let RoleRedirectGuard = class RoleRedirectGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = request.cookies["access_token"];
        if (!token) {
            console.log("Token topilmadi");
            response.redirect("/auth/login");
            return false;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
            });
            request["user"] = payload;
            const role = payload.role;
            const path = request.path;
            if (role === "admin" && path !== "/foods/admin") {
                response.redirect("/foods/admin");
                return false;
            }
            if (role === "seller" && path !== "/foods/seller") {
                response.redirect("/sellers");
                return false;
            }
            if (role === "customer" && path !== "/foods/main") {
                response.redirect("/foods/main");
                return false;
            }
            if (role === "creator" && path !== "/foods/admin") {
                response.redirect("/admins/creator");
                return false;
            }
            return true;
        }
        catch (err) {
            console.log("Token xato:", err);
            response.redirect("/auth/login");
            return false;
        }
    }
};
exports.RoleRedirectGuard = RoleRedirectGuard;
exports.RoleRedirectGuard = RoleRedirectGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RoleRedirectGuard);
//# sourceMappingURL=role.guard.js.map