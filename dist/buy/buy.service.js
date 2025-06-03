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
exports.BuyService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const buy_entity_1 = require("./entities/buy.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
const food_entity_1 = require("../Product/entities/food.entity");
const pay_entity_1 = require("../pay/entities/pay.entity");
let BuyService = class BuyService {
    buyModel;
    constructor(buyModel) {
        this.buyModel = buyModel;
    }
    async create(createBuyDto) {
        const buy = await this.buyModel.create(createBuyDto);
        return buy;
    }
    async findAll() {
        return this.buyModel.findAll({
            include: [
                {
                    model: customer_entity_1.Customer,
                    attributes: ["id", "first_name", "last_name", "email"],
                },
                {
                    model: food_entity_1.Product,
                    attributes: ["id", "name", "price"],
                },
                {
                    model: pay_entity_1.Pay,
                    attributes: ["id", "price", "type"],
                },
            ],
        });
    }
    async findOne(id) {
        return this.buyModel.findByPk(id, {
            include: [
                {
                    model: customer_entity_1.Customer,
                    attributes: ["id", "first_name", "last_name", "email"],
                },
                {
                    model: food_entity_1.Product,
                    attributes: ["id", "name", "price"],
                },
                {
                    model: pay_entity_1.Pay,
                    attributes: ["id", "amount", "method"],
                },
            ],
        });
    }
    async findPay(id) {
        return this.buyModel.findOne({ where: { pay_id: id } });
    }
    async update(id, updateBuyDto) {
        return this.buyModel.update(updateBuyDto, {
            where: { id },
            returning: true,
        });
    }
    async remove(id) {
        await this.buyModel.destroy({ where: { id } });
    }
};
exports.BuyService = BuyService;
exports.BuyService = BuyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(buy_entity_1.Buy)),
    __metadata("design:paramtypes", [Object])
], BuyService);
//# sourceMappingURL=buy.service.js.map