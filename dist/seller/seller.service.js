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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const seller_entity_1 = require("./entities/seller.entity");
const bcrypt = require("bcrypt");
const food_service_1 = require("../Product/food.service");
let SellerService = class SellerService {
    sellerModel;
    foodModel;
    constructor(sellerModel, foodModel) {
        this.sellerModel = sellerModel;
        this.foodModel = foodModel;
    }
    async create(createSellerDto) {
        const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);
        createSellerDto.password = hashedPassword;
        return this.sellerModel.create(createSellerDto);
    }
    async findAll() {
        return this.sellerModel.findAll();
    }
    async getSellerProducts(sellerId) {
        const seller = await this.foodModel.findOne(sellerId);
        return seller;
    }
    async findOne(id) {
        const seller = await this.sellerModel.findByPk(id);
        if (!seller) {
            throw new common_1.NotFoundException(`Seller with ID "${id}" not found`);
        }
        return seller;
    }
    async update(id, updateSellerDto) {
        const [affectedCount] = await this.sellerModel.update(updateSellerDto, {
            where: { id },
        });
        if (affectedCount === 0) {
            throw new common_1.NotFoundException(`Seller with ID "${id}" not found`);
        }
        return this.sellerModel.findAll({ where: { id } });
    }
    async remove(id) {
        const deletedRowCount = await this.sellerModel.destroy({
            where: { id },
        });
        if (deletedRowCount === 0) {
            throw new common_1.NotFoundException(`Seller with ID "${id}" not found`);
        }
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(seller_entity_1.Seller)),
    __metadata("design:paramtypes", [Object, food_service_1.FoodService])
], SellerService);
//# sourceMappingURL=seller.service.js.map