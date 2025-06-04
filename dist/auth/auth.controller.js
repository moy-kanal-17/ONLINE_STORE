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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_users_dto_1 = require("./dto/create-users.dto");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const auth_guard_1 = require("../common/guards/auth.guard");
const throttler_1 = require("@nestjs/throttler");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(createUserDto, role, res) {
        if (role != "customer" &&
            role !== "seller" &&
            role !== "creator" &&
            role !== "admin") {
            throw new common_1.BadRequestException("Ro'yxatdan o'tish uchun yaroqsiz rol ko'rsatildi");
        }
        const registrationResult = await this.authService.register(createUserDto, role);
        if (registrationResult) {
            return res.render("login");
        }
        else {
            return res
                .status(400)
                .json({ message: "Roʻyxatdan oʻtishda xatolik yuz berdi" });
        }
    }
    async login(loginDto, res) {
        try {
            await this.authService.login(loginDto, res);
        }
        catch (err) {
            console.log(err);
            return {
                data: loginDto,
                error: err.message || "Loginda xatolik",
            };
        }
    }
    logOut(id, role, res) {
        console.log("Logging out user with ID:", id, "and role:", role);
        return this.authService.signout(id, role, res);
    }
    getRegistriPage() {
        return {
            data: {
                email: "",
                role: "",
            },
            error: null,
        };
    }
    getLoginPage() {
        return {
            data: {
                email: "",
                role: "",
            },
            error: null,
        };
    }
    async activateUser(token) {
        return this.authService.activateUser(token);
    }
    async refreshToken(req, res) {
        const refresh_token = req.cookies["refresh_token"];
        if (!refresh_token) {
            throw new common_1.UnauthorizedException("Refresh token cookie da topilmadi");
        }
        return this.authService.refreshToken(refresh_token, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register/:role"),
    (0, common_1.Render)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("role")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUserDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout/:id"),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("role")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Get)("registri"),
    (0, common_1.Render)("registri"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getRegistriPage", null);
__decorate([
    (0, common_1.Get)("login"),
    (0, common_1.Render)("login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLoginPage", null);
__decorate([
    (0, common_1.Get)("activate/:token"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Get)("refresh"),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map