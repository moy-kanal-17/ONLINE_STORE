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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const admin_model_1 = require("./model/admin.model");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    adminModel;
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async create(createAdminDto) {
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
        createAdminDto.password = hashedPassword;
        const admin = await this.adminModel.create(createAdminDto);
        return admin;
    }
    async findAll() {
        return this.adminModel.findAll();
    }
    async findOne(id) {
        const admin = await this.adminModel.findByPk(id);
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        return admin;
    }
    async update(id, updateAdminDto) {
        const admin = await this.findOne(id);
        if (updateAdminDto.password) {
            updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
        }
        await admin.update(updateAdminDto);
        return admin;
    }
    async remove(id) {
        const admin = await this.findOne(id);
        await admin.destroy();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object])
], AdminService);
//# sourceMappingURL=admin.service.js.map