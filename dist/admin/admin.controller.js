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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./dto/admin.dto");
const swagger_1 = require("@nestjs/swagger");
const admin_model_1 = require("./model/admin.model");
const creator_guard_1 = require("../common/guards/creator.guard");
const selfOrCreater_guard_1 = require("../common/guards/selfOrCreater.guard");
const SelfOrAdmin_guard_1 = require("../common/guards/SelfOrAdmin.guard");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async create(createAdminDto) {
        return this.adminService.create(createAdminDto);
    }
    async find() {
        const admins = await this.adminService.findAll();
        if (!admins || admins.length === 0) {
            console.log("No admins found");
            return [];
        }
        console.log("Admins found:", admins);
        return admins;
    }
    async findOne(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.BadRequestException(`Invalid admin ID:${id}`);
        }
        return this.adminService.findOne(parsedId);
    }
    async update(id, updateAdminDto) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            console.log("Invalid admin ID:", id);
            throw new common_1.BadRequestException(`Invalid admin ID:${id}`);
        }
        return this.adminService.update(parsedId, updateAdminDto);
    }
    async findCreators(res) {
        const admin = await this.adminService.findAll();
        console.log("Adminlar:", admin);
        if (!admin || admin.length === 0) {
            console.log("No admins found");
            res.render('creator', { admins: "Admins not founds" });
            return;
        }
        res.render('creator', { admins: admin, title: "Creators" });
    }
    async remove(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new common_1.BadRequestException("Invalid admin ID");
        }
        return this.adminService.remove(parsedId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(creator_guard_1.CreatorhGuard),
    (0, swagger_1.ApiOperation)({ summary: "Create a new admin" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Admin created successfully",
        type: admin_model_1.Admin,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid input" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(creator_guard_1.CreatorhGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "find", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    (0, common_1.UseGuards)(selfOrCreater_guard_1.SelfOrCreatorGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get an admin by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Admin ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Admin found", type: admin_model_1.Admin }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Admin not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(SelfOrAdmin_guard_1.SelfOrModeratorGuard),
    (0, swagger_1.ApiOperation)({ summary: "Update an admin by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Admin ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Admin updated successfully",
        type: admin_model_1.Admin,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Admin not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("creator"),
    (0, common_1.UseGuards)(creator_guard_1.CreatorhGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get all creators" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of creators", type: [admin_model_1.Admin] }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findCreators", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    (0, common_1.UseGuards)(creator_guard_1.CreatorhGuard),
    (0, swagger_1.ApiOperation)({ summary: "Delete an admin by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Admin ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Admin deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Admin not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "remove", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)("Admins"),
    (0, common_1.Controller)("admins"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map