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
exports.PayService = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const pay_entity_1 = require("./entities/pay.entity");
const common_1 = require("@nestjs/common");
const buy_service_1 = require("../buy/buy.service");
const crypto_1 = require("crypto");
const jwt = require("jsonwebtoken");
const food_service_1 = require("../Product/food.service");
const customer_entity_1 = require("../customer/entities/customer.entity");
const food_entity_1 = require("../Product/entities/food.entity");
let PayService = class PayService {
    payModel;
    buyModel;
    productModel;
    constructor(payModel, buyModel, productModel) {
        this.payModel = payModel;
        this.buyModel = buyModel;
        this.productModel = productModel;
    }
    async create(createPayDto, res, req) {
        createPayDto.terminal = (0, crypto_1.randomUUID)();
        const productId = createPayDto.product_id;
        const product = await this.productModel.findone(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        console.log("Product found:", product.id);
        const productPrice = product.price;
        if (!productPrice) {
            throw new Error("Product ID is required in CreatePayDto");
        }
        createPayDto.price = productPrice;
        await this.payModel.create(createPayDto);
        const pay = await this.payModel.findOne({
            where: { terminal: createPayDto.terminal },
        });
        if (!pay) {
            throw new Error("Payment not found");
        }
        const accessToken = req.cookies["access_token"];
        console.log("Customer token from cookie:", accessToken);
        if (!accessToken) {
            console.log("Access token not found in cookie😎");
            throw new Error("Access token not found in cookie");
        }
        try {
            const decodedToken = jwt.decode(accessToken);
            const customerId = decodedToken?.sub;
            console.log("Customer ID from token:", customerId);
            if (!customerId) {
                throw new Error("Customer ID not found in token");
            }
            const productPrice = product?.price;
            const buyData = {
                customer_id: customerId,
                product_id: productId,
                price: productPrice,
                pay_id: pay.id,
            };
            const buy = await this.buyModel.create(buyData);
            if (!buy) {
                throw new Error("Buy not created");
            }
            console.log("Buy created successfully:", buy.id);
            return res.status(201).json({
                message: "Payment created successfully",
                pay: pay,
                buy: buy,
            });
        }
        catch (error) {
            console.error("Tokenni dekodlashda xatolik:", error);
            throw new Error("Tokenni dekodlashda xatolik");
        }
    }
    async findAll() {
        return this.payModel.findAll({
            include: [
                {
                    model: customer_entity_1.Customer,
                    attributes: ["id", "first_name", "last_name", "email"],
                },
                {
                    model: food_entity_1.Product,
                    attributes: ["id", "name", "price"],
                }
            ]
        });
    }
    async findOne(id) {
        return this.payModel.findByPk(id);
    }
    async update(id, updatePayDto) {
        await this.payModel.update(updatePayDto, { where: { id } });
        return this.findOne(id);
    }
    async remove(id) {
        await this.payModel.destroy({ where: { id } });
    }
};
exports.PayService = PayService;
exports.PayService = PayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(pay_entity_1.Pay)),
    __metadata("design:paramtypes", [Object, buy_service_1.BuyService,
        food_service_1.FoodService])
], PayService);
//# sourceMappingURL=pay.service.js.map