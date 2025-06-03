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
exports.SelfOrCreatorGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../../admin/admin.service");
const customer_service_1 = require("../../customer/customer.service");
const seller_service_1 = require("../../seller/seller.service");
let SelfOrCreatorGuard = class SelfOrCreatorGuard {
    jwtService;
    adminService;
    customerService;
    sellerService;
    constructor(jwtService, adminService, customerService, sellerService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.customerService = customerService;
        this.sellerService = sellerService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = request.cookies["access_token"];
        if (!token) {
            console.error("Cookie-fayllarda hech qanday access_token topilmadi!");
            response.redirect("/auth/login");
            return false;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET || "access-secret-replace-me",
            });
            request["user"] = payload;
            const userId = payload.sub;
            const role = payload.role;
            const resourceId = request.params.id;
            if (!resourceId) {
                throw new common_1.BadRequestException("Resource ID si kerak!");
            }
            const resource = await this.getResource(resourceId, role);
            if (!resource) {
                throw new common_1.UnauthorizedException("Resource topilmadi!");
            }
            if (resource.id !== userId && role !== "creator") {
                throw new common_1.UnauthorizedException("Siz ushbu resursning egasi yoki yaratuvchisi emassiz!");
            }
            return true;
        }
        catch (err) {
            console.error("SelfOrCreatorGuard HATO:", err.message);
            response.redirect("/auth/login");
            return false;
        }
    }
    async getResource(id, role) {
        switch (role) {
            case "admin":
                return await this.adminService.findOne(+id);
            case "customer":
                return await this.customerService.findOne(+id);
            case "seller":
                return await this.sellerService.findOne(+id);
            default:
                throw new common_1.UnauthorizedException(`Noma'lum rol: ${role}`);
        }
    }
};
exports.SelfOrCreatorGuard = SelfOrCreatorGuard;
exports.SelfOrCreatorGuard = SelfOrCreatorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService,
        customer_service_1.CustomerService,
        seller_service_1.SellerService])
], SelfOrCreatorGuard);
//# sourceMappingURL=selfOrCreater.guard.js.map