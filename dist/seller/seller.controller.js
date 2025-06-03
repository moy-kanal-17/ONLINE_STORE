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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const seller_service_1 = require("./seller.service");
const create_seller_dto_1 = require("./dto/create-seller.dto");
const update_seller_dto_1 = require("./dto/update-seller.dto");
const swagger_1 = require("@nestjs/swagger");
const seller_guard_1 = require("../common/guards/seller.guard");
let SellerController = class SellerController {
    sellerService;
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    async create(createSellerDto) {
        return this.sellerService.create(createSellerDto);
    }
    async sellerFoods(req) {
        const sellerId = req.user.sub;
        console.log("Seller ID:", sellerId);
        const products = await this.sellerService.getSellerProducts(sellerId);
        return {
            title: "Seller paneli",
            products,
            sellerId,
        };
    }
    async findone(req, res) {
        const sellerId = req.user.sub;
        console.log("🛎️ Seller ID:", sellerId);
        const user = await this.sellerService.findOne(+sellerId);
        return res.render("account", {
            title: "Seller Profile",
            user,
        });
    }
    async findOne(id) {
        return this.sellerService.findOne(+id);
    }
    async update(id, updateSellerDto) {
        const updatedSellers = await this.sellerService.update(+id, updateSellerDto);
        return updatedSellers;
    }
    async remove(id) {
        await this.sellerService.remove(+id);
        return { message: `Seller with ID "${id}" deleted successfully` };
    }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_seller_dto_1.CreateSellerDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(seller_guard_1.SellerhGuard),
    (0, common_1.Render)("seller"),
    (0, swagger_1.ApiOperation)({ summary: "Render seller panel with products" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Seller panel rendered" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "sellerFoods", null);
__decorate([
    (0, common_1.UseGuards)(seller_guard_1.SellerhGuard),
    (0, common_1.Get)("/profile"),
    (0, common_1.Render)("account"),
    (0, swagger_1.ApiOperation)({ summary: "Render seller profile" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "findone", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_seller_dto_1.UpdateSellerDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "remove", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.Controller)("sellers"),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map