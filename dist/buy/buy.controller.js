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
exports.BuyController = void 0;
const common_1 = require("@nestjs/common");
const buy_service_1 = require("./buy.service");
const create_buy_dto_1 = require("./dto/create-buy.dto");
const update_buy_dto_1 = require("./dto/update-buy.dto");
const seller_guard_1 = require("../common/guards/seller.guard");
const SelfOrAdmin_guard_1 = require("../common/guards/SelfOrAdmin.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
let BuyController = class BuyController {
    buyService;
    constructor(buyService) {
        this.buyService = buyService;
    }
    create(createBuyDto) {
        return this.buyService.create(createBuyDto);
    }
    findAll() {
        return this.buyService.findAll();
    }
    findOne(id) {
        return this.buyService.findOne(+id);
    }
    update(id, updateBuyDto) {
        return this.buyService.update(+id, updateBuyDto);
    }
    remove(id) {
        return this.buyService.remove(+id);
    }
};
exports.BuyController = BuyController;
__decorate([
    (0, common_1.UseGuards)(seller_guard_1.SellerhGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_buy_dto_1.CreateBuyDto]),
    __metadata("design:returntype", void 0)
], BuyController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminhGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuyController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(SelfOrAdmin_guard_1.SelfOrModeratorGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BuyController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(SelfOrAdmin_guard_1.SelfOrModeratorGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_buy_dto_1.UpdateBuyDto]),
    __metadata("design:returntype", void 0)
], BuyController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(SelfOrAdmin_guard_1.SelfOrModeratorGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BuyController.prototype, "remove", null);
exports.BuyController = BuyController = __decorate([
    (0, common_1.Controller)("buy"),
    __metadata("design:paramtypes", [buy_service_1.BuyService])
], BuyController);
//# sourceMappingURL=buy.controller.js.map