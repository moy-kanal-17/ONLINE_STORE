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
exports.Buy = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const food_entity_1 = require("../../Product/entities/food.entity");
const customer_entity_1 = require("../../customer/entities/customer.entity");
const pay_entity_1 = require("../../pay/entities/pay.entity");
let Buy = class Buy extends sequelize_typescript_1.Model {
    customer_id;
    customer;
    product_id;
    product;
    pay_id;
    pay;
};
exports.Buy = Buy;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Buy.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => customer_entity_1.Customer),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Buy.prototype, "customer_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => customer_entity_1.Customer),
    __metadata("design:type", customer_entity_1.Customer)
], Buy.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => food_entity_1.Product),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Buy.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => food_entity_1.Product),
    __metadata("design:type", food_entity_1.Product)
], Buy.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pay_entity_1.Pay),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Buy.prototype, "pay_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pay_entity_1.Pay),
    __metadata("design:type", pay_entity_1.Pay)
], Buy.prototype, "pay", void 0);
exports.Buy = Buy = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "buy" })
], Buy);
//# sourceMappingURL=buy.entity.js.map