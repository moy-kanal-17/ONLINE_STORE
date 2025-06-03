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
exports.CustomerLikeController = void 0;
const common_1 = require("@nestjs/common");
const customer_likes_service_1 = require("./customer-likes.service");
const create_customer_like_dto_1 = require("./dto/create-customer-like.dto");
const admin_guard_1 = require("../common/guards/admin.guard");
const SelfOrAdmin_guard_1 = require("../common/guards/SelfOrAdmin.guard");
const creator_guard_1 = require("../common/guards/creator.guard");
let CustomerLikeController = class CustomerLikeController {
    customerLikeService;
    constructor(customerLikeService) {
        this.customerLikeService = customerLikeService;
    }
    create(customerLike) {
        return this.customerLikeService.create(customerLike);
    }
    findAll() {
        return this.customerLikeService.findAll();
    }
    findOne(id) {
        return this.customerLikeService.findOne(+id);
    }
    remove(id) {
        return this.customerLikeService.remove(+id);
    }
};
exports.CustomerLikeController = CustomerLikeController;
__decorate([
    (0, common_1.UseGuards)(creator_guard_1.CreatorhGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_like_dto_1.CreateCustomerLikeDto]),
    __metadata("design:returntype", void 0)
], CustomerLikeController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminhGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerLikeController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(SelfOrAdmin_guard_1.SelfOrModeratorGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerLikeController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(SelfOrAdmin_guard_1.SelfOrModeratorGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerLikeController.prototype, "remove", null);
exports.CustomerLikeController = CustomerLikeController = __decorate([
    (0, common_1.Controller)("customer-likes"),
    __metadata("design:paramtypes", [customer_likes_service_1.CustomerLikeService])
], CustomerLikeController);
//# sourceMappingURL=customer-likes.controller.js.map